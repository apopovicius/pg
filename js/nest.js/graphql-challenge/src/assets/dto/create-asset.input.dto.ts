import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SyncAssetsAndPricesInput {
  @Field()
  resync: boolean;
}
