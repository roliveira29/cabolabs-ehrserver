package com.cabolabs.archetype//import org.openehr.am.archetype.Archetype//import org.openehr.am.archetype.constraintmodel.*import com.cabolabs.ehrserver.ehr.clinical_documents.ArchetypeIndexItemimport com.cabolabs.ehrserver.ehr.clinical_documents.ArchetypeIndexItemimport com.cabolabs.ehrserver.ehr.clinical_documents.OperationalTemplateIndeximport com.cabolabs.ehrserver.ehr.clinical_documents.OperationalTemplateIndexItemimport grails.util.Holdersimport groovy.util.slurpersupport.*import grails.util.Holdersimport java.util.logging.Loggerimport com.cabolabs.ehrserver.data.DataValues/* * ArchetypeIndexItem generator. */class OperationalTemplateIndexer {      def config = Holders.config.app      def log = Logger.getLogger('com.cabolabs.archetype.OperationalTemplateIndexer')      def template   def templateIndex // OperationalTemplateIndex correspondent to the template we are indexing   def indexes = []      // elems?   // [archetypeId:'openEHR-EHR-COMPOSITION.encounter.v1', path:'/context/setting', rmTypeName:'DV_CODED_TEXT']   def dataIndexes = []      // GPathResuilt corresponding to the reference to a root archetyped element   // It helps to get the name for the ELEMENT nodes to create indexes   //def currentRoot   def indexAll()   {      def path = config.opt_repo //"opts" + PS // FIXME: external configuration      def repo = new File( path )            if (!repo.exists())  throw new Exception("No existe "+ path)      if (!repo.canRead())  throw new Exception("No se puede leer "+ path)      if (!repo.isDirectory())  throw new Exception("No es un directorio "+ path)                  // Delete current OPT indexes      OperationalTemplateIndex.list().each {          it.delete()      }      ArchetypeIndexItem.list().each {         it.delete()      }      OperationalTemplateIndexItem.list().each {         it.delete()      }                  repo.eachFileMatch groovy.io.FileType.FILES, ~/.*\.opt/, { file ->                  //println "indexAll file: "+ file.name         index(file)      }   }      def index(File templateFile)   {      if (!templateFile.exists())  throw new Exception("No existe "+ templateFile.getAbsolutePath())      if (!templateFile.canRead())  throw new Exception("No se puede leer "+ templateFile.getAbsolutePath())      if (!templateFile.isFile())  throw new Exception("No es un archivo "+ templateFile.getAbsolutePath())            this.template = new XmlSlurper().parseText( templateFile.getText() ) // GPathResult                  // Create opt index      def templateId = this.template.template_id.value.text()      def concept = this.template.concept.text()      def language = this.template.language.terminology_id.value.text() +"::"+ this.template.language.code_string.text()      def uid = this.template.uid.value.text()            def archetypeId = this.template.definition.archetype_id.value.text()      def archetypeConcept = this.template.definition.term_definitions.find { it.@code.text() == 'at0000' }.items.find { it.@id == 'text' }.text()            templateIndex = new OperationalTemplateIndex(         templateId: templateId,         concept: concept,         language: language,         uid: uid,         archetypeId: archetypeId,         archetypeConcept: archetypeConcept      )      if (!templateIndex.save(flush:true)) println templateIndex.errors // TODO: log errors and throw except                  // Nombres de las tags hija directas de definition (atributos del root archetype)      // [rm_type_name, occurrences, node_id, attributes, attributes, archetype_id, template_id, term_definitions]      // println "definition attributes: "+ this.template.definition.children().collect { it.name() }     //      this.currentRoot = this.template.definition            indexObject(this.template.definition, '/', '/', this.template.definition)            //println this.paths // test      this.indexes.each { di ->                  if (di.instanceOf(ArchetypeIndexItem))         {            def existingIndex = ArchetypeIndexItem.findByArchetypeIdAndPath(di.archetypeId, di.path)                        // If the archetype index item already exists,             if (existingIndex)            {               // check if the template already has it, if not, add it to the template.               if (!templateIndex.referencedArchetypeNodes.find {it.archetypeId == di.archetypeId && it.path == di.path})               {                  println "reference existing "+ templateIndex.templateId +" > "+ di.archetypeId + di.path                  templateIndex.addToReferencedArchetypeNodes(existingIndex) // adds the existing one, do not create a new one               }            }            else            {               templateIndex.addToReferencedArchetypeNodes(di)            }         }         else         {            if (!di.save(flush:true))            {               println "======================"               println di.templateId +" "+ di.path +" "+ di.errors               println "======================"            }         }      }      this.indexes = []   }      /*    * templateFileName es el nombre del archivo sin la extension.    */   def index(String templateFileName)   {      def path = config.opt_repo + templateFileName + ".opt" //"opts" + PS + templateFileName + ".opt"      def tfile = new File( path )      index(tfile)   }      def indexAttribute(GPathResult node, String parentPath, String archetypePath, GPathResult parent)   {      if (!node) throw new Exception("Nodo vacio")      def nextPath      def nextArchPath      node.children.each {                  //println "child "+ it.name()         if (parentPath == '/') nextPath = parentPath + node.rm_attribute_name.text()         else nextPath = parentPath +'/'+ node.rm_attribute_name.text()                  if (archetypePath == '/') nextArchPath = archetypePath + node.rm_attribute_name.text()         else nextArchPath = archetypePath +'/'+ node.rm_attribute_name.text()                  indexObject(it, nextPath, nextArchPath, parent)      }   }         def getText(node, nodeId)   {      def term = node.term_definitions.find { it.@code.text() == nodeId } // <term_definitions code="at0000">      def text = term.items.find { it.@id.text() == "text" }.text() // <items id="text">Tobacco Use Summary</items>      return text   }      /*    * Procesa nodos objeto de la definicion del template.    * node es un elemento C_OBJECT ej. <children xsi:type="C_COMPLEX_OBJECT"> con rm_type_name, node_id, ...    */   def indexObject (GPathResult node, String parentPath, String archetypePath, GPathResult parent)   {      if (!node) throw new Exception("Nodo vacio")            // Avoid slots      if (node.'@xsi:type'.text() == "ARCHETYPE_SLOT")      {         log.info('ARCHETYPE_SLOT found, further indexing avoided for template '+ this.template.template_id.value.text())         return      }            //println "indexObject: "+ node.name() // children con xsi:type como attr y rm_type_name como hijo 0            def path = parentPath            //println path            // Archetype Roots will have Term Definitions inside from where the name of the indexes should be taken.      // Each Archetype Root Terminology is independent from the other Archetype Roots.      //println "Node type: "+ node.'@xsi:type'      if (node.'@xsi:type'.text() == "C_ARCHETYPE_ROOT")      {         //println "Archetype found: "+ node.archetype_id.value.text()                  // Helps to get the name for the indexed ELEMENTs         parent = node                  /*         this.currentRoot.term_definitions.each { term ->                        // - at0005 [text: E, description: Educational components offered.]            println "  - "+ term.@code +" "+ term.items.collect { item -> item.@id.text() +": "+ item.text() }                        //term.items.each { item ->            //   println "    + "+ item.@id            //   println "    + "+ item.text()            //}            //println term.items.collect { item -> item.@id.text() +" "+ item.text() }         }         */                  path += '[archetype_id='+ node.archetype_id.value +']' // slot in the path instead of node_id         archetypePath = '/' // archetype root found                  // test         //println "index root "+ node.name() +" nodeid "+ node.node_id.text()                  // Adding indexes for root nodes, needed for querying with concept names instead of archetype ids         def archIndexIndex = new ArchetypeIndexItem(            archetypeId: parent.archetype_id.value.text(),            path: archetypePath,            rmTypeName: node.rm_type_name.text(),            name: getText(node, node.node_id.text())         )                  def optIndexItem = new OperationalTemplateIndexItem(            templateId: this.template.template_id.text(),            path: path,            rmTypeName: node.rm_type_name.text(),            name: getText(node, node.node_id.text())         )                  indexes << archIndexIndex         indexes << optIndexItem      }      else      {         if (path != '/' && !node.node_id.isEmpty() && node.node_id.text() != '')         {            path += '['+ node.node_id.text() + ']'            archetypePath += '['+ node.node_id.text() + ']'         }      }            //println "parent "+ parent.name()      //println "current rm_type_name "+ node.rm_type_name.text()            // just to validate the type against the supported types      def validIndexType = true      try      {         DataValues.valueOfString(node.rm_type_name.text())      }      catch (IllegalArgumentException ex)      {         validIndexType = false      }            /*       * If current node should be indexed based on its rm_type_name       */      if ( !node.rm_type_name.isEmpty() && validIndexType )      {         // test         //this.paths << path         //println " > index: "+ path +' '+ node.rm_type_name.text()                // TODO: index ELEMENT.null_flavour                  // --------------------------------------------------------         // Find node name         def nodeId = node.node_id.text()         def term         def description         def addParentAttrName = false // https://github.com/ppazos/cabolabs-ehrserver/issues/103                  if (!nodeId)// For datatypes there is no nodeId, we should get the nodeId of the parent ELEMENT         {            // .parent es attributes 'value', .parent.parent es children 'ELEMENT'            nodeId = node.parent().parent().node_id.text()            addParentAttrName = true         }                  /* reference structure:          * <term_definitions code="at0000">              <items id="text">Tobacco Use Summary</items>              <items id="description">Summary or persisting information about tobacco use or consumption.</items>            </term_definitions>          *///         term = this.currentRoot.term_definitions.find { it.@code.text() == nodeId } // <term_definitions code="at0000">                  /*         term = parent.term_definitions.find { it.@code.text() == nodeId } // <term_definitions code="at0000">         description = term.items.find { it.@id.text() == "text" }.text() // <items id="text">Tobacco Use Summary</items>         */                  description = getText(parent, nodeId)                  if (addParentAttrName)         {            def parentAttrName = node.parent().rm_attribute_name.text()                        // Avoids to add .value to at the ELEMENT.value indexes, for those we want to show just the parent ELEMENT name            if (parentAttrName != 'value')            {               description += '.'+ parentAttrName // node.parent() is a C_ATTRIBUTE            }         }                  // --------------------------------------------------------         // Find type of ELEMENT.value                  /* reference structure:          * <attributes xsi:type="C_SINGLE_ATTRIBUTE">              <rm_attribute_name>value</rm_attribute_name>              ...                                                  <children xsi:type="C_COMPLEX_OBJECT">                <rm_type_name>DV_BOOLEAN</rm_type_name>          */         //def valueNode = node.attributes.find { it.rm_attribute_name.text() == "value" }         //def type = valueNode.children[0].rm_type_name.text() // DV_BOOLEAN                  def type = node.rm_type_name.text() // DV_BOOLEAN         def archIndexIndex = new ArchetypeIndexItem(           archetypeId: parent.archetype_id.value.text(),           path: archetypePath, // +"/value",            rmTypeName: type,           name: description         )                  def optIndexItem = new OperationalTemplateIndexItem(            templateId: this.template.template_id.text(),            path: path,            rmTypeName: type,            name: description         )                  // https://github.com/ppazos/cabolabs-ehrserver/issues/137         if (type == 'DV_CODED_TEXT')         {            def def_code_node = node.attributes.find{ it.rm_attribute_name.text() == 'defining_code' }            def uri = def_code_node.children.referenceSetUri.text()            if (uri) archIndexIndex.terminologyRef = uri         }                  indexes << archIndexIndex         indexes << optIndexItem      }            // continue processing      node.attributes.each {         //println "attr "+ it.name()         indexAttribute(it, path, archetypePath, parent) // No pone su nodeID porque es root      }      // ===========================================================================            /** OLD SAMPLE CODE...      // CObject      def co      def nodeID      def indexPath      def text            this.archetype.physicalPaths().sort().each { path ->              co = this.archetype.node(path)                // No procesa el nodo /         if (!co.getParent()) return                      // Indices de nivel 2 solo para ELEMENT.value         if (co.rmTypeName == "ELEMENT")         {            nodeID = co.nodeID                        if (!nodeID) throw new Exception("No tiene nodeID: ELEMENT indefinido")                     // node name            def locale = Holders.config.app.l10n.locale            def term = this.archetype.ontology.termDefinition(locale, nodeID)            if (!term)            {               //println " + ERROR: termino no definido para el nodo "+ nodeID            }            else            {               //println " + Node name = "+ term.getText()            }                        // FIXME: JAVA REF IMPL los tipos del RM son DvQuantity en lugar de DV_QUANTITY            //println " ~ index "+ co.path() +"/value "+ this.archetype.node( co.path() +"/value" ).rmTypeName                        indexPath = co.path() +"/value"                        indexes << new OperationalTemplateIndexItem(archetypeId: this.archetype.archetypeId.value,                                     path: indexPath,                                     rmTypeName: this.archetype.node( indexPath ).rmTypeName, // type de ELEMENT.value ej. DvQuantity                                     name: term.getText())                        //println ""         }      } // physical paths     */   }}