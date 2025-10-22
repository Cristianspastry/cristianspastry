import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet

export const structure: StructureResolver = (S) =>
  S.list()
          .title('Contenuti')
          .items([
            // Ricette
            S.listItem()
              .title('Ricette')
              .icon(() => '🍰')
              .child(
                S.documentTypeList('ricetta')
                  .title('Ricette')
                  .filter('_type == "ricetta"')
                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                  .child((documentId) =>
                    S.document()
                      .documentId(documentId)
                      .schemaType('ricetta')
                  )
              ),

            // Tecniche
            S.listItem()
              .title('Tecniche')
              .icon(() => '🔪')
              .child(
                S.documentTypeList('tecnica')
                  .title('Tecniche')
                  .filter('_type == "tecnica"')
                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                  .child((documentId) =>
                    S.document()
                      .documentId(documentId)
                      .schemaType('tecnica')
                  )
              ),

            // Scienza
            S.listItem()
              .title('Scienza')
              .icon(() => '🔬')
              .child(
                S.documentTypeList('scienza')
                  .title('Scienza della Pasticceria')
                  .filter('_type == "scienza"')
                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                  .child((documentId) =>
                    S.document()
                      .documentId(documentId)
                      .schemaType('scienza')
                  )
              ),

            S.divider(),

            // Categorie
            S.listItem()
              .title('Categorie')
              .icon(() => '📁')
              .child(
                S.documentTypeList('category')
                  .title('Categorie')
                  .filter('_type == "category"')
              ),

            // Autori
            S.listItem()
              .title('Autori')
              .icon(() => '👨‍🍳')
              .child(
                S.documentTypeList('author')
                  .title('Autori')
                  .filter('_type == "author"')
              ),

            S.divider(),

            // Statistiche
            S.listItem()
              .title('Statistiche')
              .icon(() => '📊')
              .child(
                S.list()
                  .title('Statistiche')
                  .items([
                    S.listItem()
                      .title('Ricette pubblicate')
                      .child(
                        S.documentList()
                          .title('Ricette pubblicate')
                          .filter('_type == "ricetta" && defined(publishedAt) && publishedAt < now()')
                          .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                      ),
                    S.listItem()
                      .title('Ricette in bozza')
                      .child(
                        S.documentList()
                          .title('Ricette in bozza')
                          .filter('_type == "ricetta" && (!defined(publishedAt) || publishedAt > now())')
                      ),
                    S.listItem()
                      .title('Articoli in evidenza')
                      .child(
                        S.documentList()
                          .title('Articoli in evidenza')
                          .filter('_type == "scienza" && featured == true')
                      ),
                  ])
              ),
    ])
