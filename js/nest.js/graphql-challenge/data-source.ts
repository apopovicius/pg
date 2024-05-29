import { DataSource } from 'typeorm';
import { dataSourceOptions } from '@App/data-source-options';

export const dataSource = new DataSource(dataSourceOptions);
