import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import authorType from './authorType'
import recipeType from './recipeType'
import tecnicaType from './tecnicaType'
import scienzaType from './scienzaType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType,recipeType,tecnicaType,scienzaType],
}
