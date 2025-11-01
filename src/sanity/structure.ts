import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenuti')
    .items([
      // ============================================
      // SEZIONE CONTENUTI PRINCIPALI
      // ============================================
      S.listItem()
        .title('📚 Contenuti')
        .child(
          S.list()
            .title('Gestione Contenuti')
            .items([
              // Ricette con viste filtrate
              S.listItem()
                .title('🍰 Ricette')
                .child(
                  S.list()
                    .title('Ricette')
                    .items([
                      // Tutte le ricette
                      S.listItem()
                        .title('Tutte le ricette')
                        .icon(() => '📋')
                        .child(
                          S.documentTypeList('ricetta')
                            .title('Tutte le ricette')
                            .filter('_type == "ricetta"')
                            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                        ),

                      S.divider(),

                      // Per stato pubblicazione
                      S.listItem()
                        .title('✅ Pubblicate')
                        .child(
                          S.documentList()
                            .title('Ricette pubblicate')
                            .filter('_type == "ricetta" && defined(publishedAt) && publishedAt < now()')
                            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                        ),
                      S.listItem()
                        .title('✏️ Bozze')
                        .child(
                          S.documentList()
                            .title('Ricette in bozza')
                            .filter('_type == "ricetta" && (!defined(publishedAt) || publishedAt > now())')
                            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                        ),
                      S.listItem()
                        .title('📅 Programmate')
                        .child(
                          S.documentList()
                            .title('Ricette con pubblicazione programmata')
                            .filter('_type == "ricetta" && defined(publishedAt) && publishedAt > now()')
                            .defaultOrdering([{ field: 'publishedAt', direction: 'asc' }])
                        ),

                      S.divider(),

                      // Per workflow
                      S.listItem()
                        .title('Workflow')
                        .icon(() => '🔄')
                        .child(
                          S.list()
                            .title('Stato Workflow')
                            .items([
                              S.listItem()
                                .title('✏️ In Bozza')
                                .child(
                                  S.documentList()
                                    .title('Ricette in bozza')
                                    .filter('_type == "ricetta" && workflow.status == "draft"')
                                    .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                                ),
                              S.listItem()
                                .title('👀 In Revisione')
                                .child(
                                  S.documentList()
                                    .title('Ricette in revisione')
                                    .filter('_type == "ricetta" && workflow.status == "in_review"')
                                    .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
                                ),
                              S.listItem()
                                .title('✅ Approvate')
                                .child(
                                  S.documentList()
                                    .title('Ricette approvate')
                                    .filter('_type == "ricetta" && workflow.status == "approved"')
                                    .defaultOrdering([{ field: 'workflow.approvedAt', direction: 'desc' }])
                                ),
                              S.listItem()
                                .title('🔄 Da Aggiornare')
                                .child(
                                  S.documentList()
                                    .title('Ricette da aggiornare')
                                    .filter('_type == "ricetta" && workflow.status == "needs_update"')
                                    .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
                                ),
                            ])
                        ),

                      S.divider(),

                      // Per difficoltà
                      S.listItem()
                        .title('Per difficoltà')
                        .icon(() => '🎯')
                        .child(
                          S.list()
                            .title('Ricette per difficoltà')
                            .items([
                              S.listItem()
                                .title('🟢 Facile')
                                .child(
                                  S.documentList()
                                    .title('Ricette facili')
                                    .filter('_type == "ricetta" && difficulty == "facile"')
                                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                                ),
                              S.listItem()
                                .title('🟡 Media')
                                .child(
                                  S.documentList()
                                    .title('Ricette medie')
                                    .filter('_type == "ricetta" && difficulty == "media"')
                                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                                ),
                              S.listItem()
                                .title('🟠 Difficile')
                                .child(
                                  S.documentList()
                                    .title('Ricette difficili')
                                    .filter('_type == "ricetta" && difficulty == "difficile"')
                                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                                ),
                              S.listItem()
                                .title('🔴 Professionale')
                                .child(
                                  S.documentList()
                                    .title('Ricette professionali')
                                    .filter('_type == "ricetta" && difficulty == "professionale"')
                                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                                ),
                            ])
                        ),

                      S.divider(),

                      // Per tempo di preparazione
                      S.listItem()
                        .title('Per tempo')
                        .icon(() => '⏱️')
                        .child(
                          S.list()
                            .title('Ricette per tempo')
                            .items([
                              S.listItem()
                                .title('⚡ Veloci (< 30 min)')
                                .child(
                                  S.documentList()
                                    .title('Ricette veloci')
                                    .filter('_type == "ricetta" && prepTime + cookTime < 30')
                                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                                ),
                              S.listItem()
                                .title('🕐 Medie (30-60 min)')
                                .child(
                                  S.documentList()
                                    .title('Ricette medie')
                                    .filter('_type == "ricetta" && prepTime + cookTime >= 30 && prepTime + cookTime <= 60')
                                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                                ),
                              S.listItem()
                                .title('🕐🕐 Lunghe (> 60 min)')
                                .child(
                                  S.documentList()
                                    .title('Ricette lunghe')
                                    .filter('_type == "ricetta" && prepTime + cookTime > 60')
                                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                                ),
                            ])
                        ),
                    ])
                ),

              // Tecniche
              S.listItem()
                .title('🔪 Tecniche')
                .child(
                  S.list()
                    .title('Tecniche')
                    .items([
                      S.listItem()
                        .title('Tutte le tecniche')
                        .icon(() => '📋')
                        .child(
                          S.documentTypeList('tecnica')
                            .title('Tutte le tecniche')
                            .filter('_type == "tecnica"')
                            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                        ),

                      S.divider(),

                      S.listItem()
                        .title('✅ Pubblicate')
                        .child(
                          S.documentList()
                            .title('Tecniche pubblicate')
                            .filter('_type == "tecnica" && defined(publishedAt) && publishedAt < now()')
                            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                        ),
                      S.listItem()
                        .title('✏️ Bozze')
                        .child(
                          S.documentList()
                            .title('Tecniche in bozza')
                            .filter('_type == "tecnica" && (!defined(publishedAt) || publishedAt > now())')
                            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                        ),
                    ])
                ),

              // Scienza
              S.listItem()
                .title('🔬 Scienza')
                .child(
                  S.list()
                    .title('Scienza della Pasticceria')
                    .items([
                      S.listItem()
                        .title('Tutti gli articoli')
                        .icon(() => '📋')
                        .child(
                          S.documentTypeList('scienza')
                            .title('Tutti gli articoli')
                            .filter('_type == "scienza"')
                            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                        ),

                      S.divider(),

                      S.listItem()
                        .title('✅ Pubblicati')
                        .child(
                          S.documentList()
                            .title('Articoli pubblicati')
                            .filter('_type == "scienza" && defined(publishedAt) && publishedAt < now()')
                            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                        ),
                      S.listItem()
                        .title('✏️ Bozze')
                        .child(
                          S.documentList()
                            .title('Articoli in bozza')
                            .filter('_type == "scienza" && (!defined(publishedAt) || publishedAt > now())')
                            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                        ),
                      S.listItem()
                        .title('⭐ In evidenza')
                        .child(
                          S.documentList()
                            .title('Articoli in evidenza')
                            .filter('_type == "scienza" && featured == true')
                            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                        ),
                    ])
                ),
            ])
        ),

      S.divider(),

      // ============================================
      // SEZIONE GESTIONE
      // ============================================
      S.listItem()
        .title('⚙️ Gestione')
        .child(
          S.list()
            .title('Gestione Sito')
            .items([
              // Categorie
              S.listItem()
                .title('📁 Categorie')
                .child(
                  S.documentTypeList('category')
                    .title('Categorie')
                    .filter('_type == "category"')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                ),

              // Autori
              S.listItem()
                .title('👨‍🍳 Autori')
                .child(
                  S.documentTypeList('author')
                    .title('Autori')
                    .filter('_type == "author"')
                    .defaultOrdering([{ field: 'name', direction: 'asc' }])
                ),

              S.divider(),

              // Prodotti Affiliati
              S.listItem()
                .title('📦 Prodotti Affiliati')
                .child(
                  S.list()
                    .title('Prodotti')
                    .items([
                      S.listItem()
                        .title('Tutti i prodotti')
                        .icon(() => '📋')
                        .child(
                          S.documentTypeList('product')
                            .title('Tutti i prodotti')
                            .filter('_type == "product"')
                            .defaultOrdering([{ field: 'order', direction: 'asc' }])
                        ),

                      S.divider(),

                      S.listItem()
                        .title('⭐ In evidenza')
                        .child(
                          S.documentList()
                            .title('Prodotti in evidenza')
                            .filter('_type == "product" && featured == true')
                            .defaultOrdering([{ field: 'order', direction: 'asc' }])
                        ),

                      S.divider(),

                      S.listItem()
                        .title('Per categoria')
                        .icon(() => '📂')
                        .child(
                          S.list()
                            .title('Prodotti per categoria')
                            .items([
                              S.listItem()
                                .title('🥧 Crostate')
                                .child(
                                  S.documentList()
                                    .title('Crostate perfette')
                                    .filter('_type == "product" && category == "crostate"')
                                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                                ),
                              S.listItem()
                                .title('🧈 Ingredienti')
                                .child(
                                  S.documentList()
                                    .title('Ingredienti migliori')
                                    .filter('_type == "product" && category == "ingredienti"')
                                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                                ),
                              S.listItem()
                                .title('🔥 Cottura')
                                .child(
                                  S.documentList()
                                    .title('Strumenti di cottura')
                                    .filter('_type == "product" && category == "cottura"')
                                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                                ),
                              S.listItem()
                                .title('🎨 Decorazione')
                                .child(
                                  S.documentList()
                                    .title('Tutto per decorare')
                                    .filter('_type == "product" && category == "decorazione"')
                                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                                ),
                              S.listItem()
                                .title('🔪 Attrezzatura')
                                .child(
                                  S.documentList()
                                    .title('Attrezzatura base')
                                    .filter('_type == "product" && category == "attrezzatura"')
                                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                                ),
                              S.listItem()
                                .title('⚡ Elettrodomestici')
                                .child(
                                  S.documentList()
                                    .title('Elettrodomestici')
                                    .filter('_type == "product" && category == "elettrodomestici"')
                                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                                ),
                            ])
                        ),
                    ])
                ),
            ])
        ),

      S.divider(),

      // ============================================
      // SEZIONE STATISTICHE E REPORT
      // ============================================
      S.listItem()
        .title('📊 Statistiche & Insights')
        .child(
          S.list()
            .title('Statistiche e Analytics')
            .items([
              // Overview generale
              S.listItem()
                .title('📈 Dashboard')
                .child(
                  S.list()
                    .title('Dashboard Generale')
                    .items([
                      S.listItem()
                        .title('📊 Contenuti totali')
                        .child(
                          S.documentList()
                            .title('Tutti i contenuti')
                            .filter('_type in ["ricetta", "tecnica", "scienza"]')
                            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                        ),
                      S.listItem()
                        .title('🆕 Ultimi contenuti creati')
                        .child(
                          S.documentList()
                            .title('Ultimi 50 contenuti')
                            .filter('_type in ["ricetta", "tecnica", "scienza"]')
                            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                        ),
                      S.listItem()
                        .title('🔄 Modificati di recente')
                        .child(
                          S.documentList()
                            .title('Contenuti modificati')
                            .filter('_type in ["ricetta", "tecnica", "scienza"]')
                            .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
                        ),
                    ])
                ),

              S.divider(),

              // Ricette Stats
              S.listItem()
                .title('🍰 Statistiche Ricette')
                .child(
                  S.list()
                    .title('Statistiche Ricette')
                    .items([
                      S.listItem()
                        .title('✅ Pubblicate')
                        .child(
                          S.documentList()
                            .title('Ricette pubblicate')
                            .filter('_type == "ricetta" && defined(publishedAt) && publishedAt < now()')
                            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                        ),
                      S.listItem()
                        .title('✏️ Bozze')
                        .child(
                          S.documentList()
                            .title('Ricette in bozza')
                            .filter('_type == "ricetta" && (!defined(publishedAt) || publishedAt > now())')
                            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                        ),
                      S.listItem()
                        .title('🖼️ Senza immagine')
                        .child(
                          S.documentList()
                            .title('Ricette senza immagine')
                            .filter('_type == "ricetta" && !defined(mainImage)')
                        ),
                      S.listItem()
                        .title('🏷️ Senza categoria')
                        .child(
                          S.documentList()
                            .title('Ricette senza categoria')
                            .filter('_type == "ricetta" && !defined(categories) || count(categories) == 0')
                        ),
                    ])
                ),

              // SEO Report
              S.listItem()
                .title('🔍 SEO Report')
                .child(
                  S.list()
                    .title('Report SEO')
                    .items([
                      S.listItem()
                        .title('❌ Senza Meta Description')
                        .child(
                          S.documentList()
                            .title('Contenuti senza meta description')
                            .filter('_type in ["ricetta", "tecnica", "scienza"] && !defined(seo.metaDescription)')
                        ),
                      S.listItem()
                        .title('❌ Senza Focus Keyphrase')
                        .child(
                          S.documentList()
                            .title('Contenuti senza focus keyphrase')
                            .filter('_type in ["ricetta", "tecnica", "scienza"] && !defined(seo.focusKeyphrase)')
                        ),
                      S.listItem()
                        .title('🚫 No Index')
                        .child(
                          S.documentList()
                            .title('Contenuti con noIndex')
                            .filter('_type in ["ricetta", "tecnica", "scienza"] && seo.noIndex == true')
                        ),
                    ])
                ),
            ])
        ),
    ])
