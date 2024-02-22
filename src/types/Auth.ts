import { AuthEnum } from 'enums/AuthEnum';

export interface Auth {
  id: number,
  endpoint: string,
  title: string,
  type: AuthEnum,
  fields: Field[]
}

interface Field {
  id: string,
  name: string,
  type: string,
  text: string,
  error: string,
  pattern: string,
}