import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Address } from './Entity/address.entity';
import { Category } from './Entity/category.entity';
import { Product } from './Entity/product.entity';
import { Role } from './Entity/role.entity';
import { User } from './Entity/user.entity';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { RoleController } from './role/role.controller';
import { RoleService } from './role/role.service';
import { RoleModule } from './role/role.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'porto',
      entities: [Product, Category, User, Role, Address],
      synchronize: true,
    }),
    AuthModule,
    ProductModule,
    UserModule,
    RoleModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
