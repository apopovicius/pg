import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Asset } from './asset.model';

@ObjectType({ description: 'asset price' })
@Entity()
export class AssetPrice {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column({ type: 'decimal', precision: 20, scale: 8 })
  price: number;

  @Field()
  @Column()
  timestamp: Date;

  @ManyToOne(() => Asset, (asset) => asset.prices, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  asset: Asset;
}
