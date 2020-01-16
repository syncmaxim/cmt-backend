import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';
import { AppController } from './app.controller';
import {UsersModule} from "./modules/users/users.module";
import { AuthModule } from './modules/auth/auth.module';
import { EventsModule } from './modules/events/events.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}),
    UsersModule,
    AuthModule,
    EventsModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  constructor() {}
}
