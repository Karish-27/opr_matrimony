
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Profile
 * 
 */
export type Profile = $Result.DefaultSelection<Prisma.$ProfilePayload>
/**
 * Model UserProfile
 * 
 */
export type UserProfile = $Result.DefaultSelection<Prisma.$UserProfilePayload>
/**
 * Model ParentInfo
 * 
 */
export type ParentInfo = $Result.DefaultSelection<Prisma.$ParentInfoPayload>
/**
 * Model HoroscopeProfile
 * 
 */
export type HoroscopeProfile = $Result.DefaultSelection<Prisma.$HoroscopeProfilePayload>
/**
 * Model ProfileView
 * 
 */
export type ProfileView = $Result.DefaultSelection<Prisma.$ProfileViewPayload>
/**
 * Model Payment
 * 
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.profile`: Exposes CRUD operations for the **Profile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Profiles
    * const profiles = await prisma.profile.findMany()
    * ```
    */
  get profile(): Prisma.ProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userProfile`: Exposes CRUD operations for the **UserProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserProfiles
    * const userProfiles = await prisma.userProfile.findMany()
    * ```
    */
  get userProfile(): Prisma.UserProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.parentInfo`: Exposes CRUD operations for the **ParentInfo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ParentInfos
    * const parentInfos = await prisma.parentInfo.findMany()
    * ```
    */
  get parentInfo(): Prisma.ParentInfoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.horoscopeProfile`: Exposes CRUD operations for the **HoroscopeProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HoroscopeProfiles
    * const horoscopeProfiles = await prisma.horoscopeProfile.findMany()
    * ```
    */
  get horoscopeProfile(): Prisma.HoroscopeProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.profileView`: Exposes CRUD operations for the **ProfileView** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProfileViews
    * const profileViews = await prisma.profileView.findMany()
    * ```
    */
  get profileView(): Prisma.ProfileViewDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Profile: 'Profile',
    UserProfile: 'UserProfile',
    ParentInfo: 'ParentInfo',
    HoroscopeProfile: 'HoroscopeProfile',
    ProfileView: 'ProfileView',
    Payment: 'Payment'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "profile" | "userProfile" | "parentInfo" | "horoscopeProfile" | "profileView" | "payment"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Profile: {
        payload: Prisma.$ProfilePayload<ExtArgs>
        fields: Prisma.ProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findFirst: {
            args: Prisma.ProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findMany: {
            args: Prisma.ProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          create: {
            args: Prisma.ProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          createMany: {
            args: Prisma.ProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          update: {
            args: Prisma.ProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          deleteMany: {
            args: Prisma.ProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          aggregate: {
            args: Prisma.ProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfile>
          }
          groupBy: {
            args: Prisma.ProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfileCountArgs<ExtArgs>
            result: $Utils.Optional<ProfileCountAggregateOutputType> | number
          }
        }
      }
      UserProfile: {
        payload: Prisma.$UserProfilePayload<ExtArgs>
        fields: Prisma.UserProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          findFirst: {
            args: Prisma.UserProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          findMany: {
            args: Prisma.UserProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>[]
          }
          create: {
            args: Prisma.UserProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          createMany: {
            args: Prisma.UserProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          update: {
            args: Prisma.UserProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          deleteMany: {
            args: Prisma.UserProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          aggregate: {
            args: Prisma.UserProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserProfile>
          }
          groupBy: {
            args: Prisma.UserProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserProfileCountArgs<ExtArgs>
            result: $Utils.Optional<UserProfileCountAggregateOutputType> | number
          }
        }
      }
      ParentInfo: {
        payload: Prisma.$ParentInfoPayload<ExtArgs>
        fields: Prisma.ParentInfoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ParentInfoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentInfoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ParentInfoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentInfoPayload>
          }
          findFirst: {
            args: Prisma.ParentInfoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentInfoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ParentInfoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentInfoPayload>
          }
          findMany: {
            args: Prisma.ParentInfoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentInfoPayload>[]
          }
          create: {
            args: Prisma.ParentInfoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentInfoPayload>
          }
          createMany: {
            args: Prisma.ParentInfoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ParentInfoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentInfoPayload>
          }
          update: {
            args: Prisma.ParentInfoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentInfoPayload>
          }
          deleteMany: {
            args: Prisma.ParentInfoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ParentInfoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ParentInfoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentInfoPayload>
          }
          aggregate: {
            args: Prisma.ParentInfoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateParentInfo>
          }
          groupBy: {
            args: Prisma.ParentInfoGroupByArgs<ExtArgs>
            result: $Utils.Optional<ParentInfoGroupByOutputType>[]
          }
          count: {
            args: Prisma.ParentInfoCountArgs<ExtArgs>
            result: $Utils.Optional<ParentInfoCountAggregateOutputType> | number
          }
        }
      }
      HoroscopeProfile: {
        payload: Prisma.$HoroscopeProfilePayload<ExtArgs>
        fields: Prisma.HoroscopeProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HoroscopeProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoroscopeProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HoroscopeProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoroscopeProfilePayload>
          }
          findFirst: {
            args: Prisma.HoroscopeProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoroscopeProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HoroscopeProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoroscopeProfilePayload>
          }
          findMany: {
            args: Prisma.HoroscopeProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoroscopeProfilePayload>[]
          }
          create: {
            args: Prisma.HoroscopeProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoroscopeProfilePayload>
          }
          createMany: {
            args: Prisma.HoroscopeProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.HoroscopeProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoroscopeProfilePayload>
          }
          update: {
            args: Prisma.HoroscopeProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoroscopeProfilePayload>
          }
          deleteMany: {
            args: Prisma.HoroscopeProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HoroscopeProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.HoroscopeProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoroscopeProfilePayload>
          }
          aggregate: {
            args: Prisma.HoroscopeProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHoroscopeProfile>
          }
          groupBy: {
            args: Prisma.HoroscopeProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<HoroscopeProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.HoroscopeProfileCountArgs<ExtArgs>
            result: $Utils.Optional<HoroscopeProfileCountAggregateOutputType> | number
          }
        }
      }
      ProfileView: {
        payload: Prisma.$ProfileViewPayload<ExtArgs>
        fields: Prisma.ProfileViewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfileViewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileViewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfileViewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileViewPayload>
          }
          findFirst: {
            args: Prisma.ProfileViewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileViewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfileViewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileViewPayload>
          }
          findMany: {
            args: Prisma.ProfileViewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileViewPayload>[]
          }
          create: {
            args: Prisma.ProfileViewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileViewPayload>
          }
          createMany: {
            args: Prisma.ProfileViewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProfileViewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileViewPayload>
          }
          update: {
            args: Prisma.ProfileViewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileViewPayload>
          }
          deleteMany: {
            args: Prisma.ProfileViewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfileViewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProfileViewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileViewPayload>
          }
          aggregate: {
            args: Prisma.ProfileViewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfileView>
          }
          groupBy: {
            args: Prisma.ProfileViewGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfileViewGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfileViewCountArgs<ExtArgs>
            result: $Utils.Optional<ProfileViewCountAggregateOutputType> | number
          }
        }
      }
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>
        fields: Prisma.PaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayment>
          }
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    profile?: ProfileOmit
    userProfile?: UserProfileOmit
    parentInfo?: ParentInfoOmit
    horoscopeProfile?: HoroscopeProfileOmit
    profileView?: ProfileViewOmit
    payment?: PaymentOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    profileViews: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profileViews?: boolean | UserCountOutputTypeCountProfileViewsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProfileViewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfileViewWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
    credits: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
    credits: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    firstName: string | null
    lastName: string | null
    isActive: boolean | null
    credits: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    firstName: string | null
    lastName: string | null
    isActive: boolean | null
    credits: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    firstName: number
    lastName: number
    isActive: number
    credits: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
    credits?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
    credits?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    isActive?: true
    credits?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    isActive?: true
    credits?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    isActive?: true
    credits?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    password: string
    firstName: string
    lastName: string
    isActive: boolean
    credits: number
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    isActive?: boolean
    credits?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | User$profileArgs<ExtArgs>
    profileViews?: boolean | User$profileViewsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    isActive?: boolean
    credits?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "firstName" | "lastName" | "isActive" | "credits" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | User$profileArgs<ExtArgs>
    profileViews?: boolean | User$profileViewsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      profile: Prisma.$ProfilePayload<ExtArgs> | null
      profileViews: Prisma.$ProfileViewPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      password: string
      firstName: string
      lastName: string
      isActive: boolean
      credits: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends User$profileArgs<ExtArgs> = {}>(args?: Subset<T, User$profileArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    profileViews<T extends User$profileViewsArgs<ExtArgs> = {}>(args?: Subset<T, User$profileViewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfileViewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly credits: FieldRef<"User", 'Int'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.profile
   */
  export type User$profileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    where?: ProfileWhereInput
  }

  /**
   * User.profileViews
   */
  export type User$profileViewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileView
     */
    select?: ProfileViewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileView
     */
    omit?: ProfileViewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileViewInclude<ExtArgs> | null
    where?: ProfileViewWhereInput
    orderBy?: ProfileViewOrderByWithRelationInput | ProfileViewOrderByWithRelationInput[]
    cursor?: ProfileViewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProfileViewScalarFieldEnum | ProfileViewScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Profile
   */

  export type AggregateProfile = {
    _count: ProfileCountAggregateOutputType | null
    _avg: ProfileAvgAggregateOutputType | null
    _sum: ProfileSumAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  export type ProfileAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    age: number | null
  }

  export type ProfileSumAggregateOutputType = {
    id: number | null
    userId: number | null
    age: number | null
  }

  export type ProfileMinAggregateOutputType = {
    id: number | null
    userId: number | null
    firstName: string | null
    lastName: string | null
    age: number | null
    regNo: string | null
    liked: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfileMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    firstName: string | null
    lastName: string | null
    age: number | null
    regNo: string | null
    liked: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfileCountAggregateOutputType = {
    id: number
    userId: number
    firstName: number
    lastName: number
    age: number
    regNo: number
    liked: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProfileAvgAggregateInputType = {
    id?: true
    userId?: true
    age?: true
  }

  export type ProfileSumAggregateInputType = {
    id?: true
    userId?: true
    age?: true
  }

  export type ProfileMinAggregateInputType = {
    id?: true
    userId?: true
    firstName?: true
    lastName?: true
    age?: true
    regNo?: true
    liked?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    firstName?: true
    lastName?: true
    age?: true
    regNo?: true
    liked?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfileCountAggregateInputType = {
    id?: true
    userId?: true
    firstName?: true
    lastName?: true
    age?: true
    regNo?: true
    liked?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profile to aggregate.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Profiles
    **/
    _count?: true | ProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfileMaxAggregateInputType
  }

  export type GetProfileAggregateType<T extends ProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfile[P]>
      : GetScalarType<T[P], AggregateProfile[P]>
  }




  export type ProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfileWhereInput
    orderBy?: ProfileOrderByWithAggregationInput | ProfileOrderByWithAggregationInput[]
    by: ProfileScalarFieldEnum[] | ProfileScalarFieldEnum
    having?: ProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfileCountAggregateInputType | true
    _avg?: ProfileAvgAggregateInputType
    _sum?: ProfileSumAggregateInputType
    _min?: ProfileMinAggregateInputType
    _max?: ProfileMaxAggregateInputType
  }

  export type ProfileGroupByOutputType = {
    id: number
    userId: number
    firstName: string
    lastName: string
    age: number | null
    regNo: string
    liked: boolean | null
    createdAt: Date
    updatedAt: Date
    _count: ProfileCountAggregateOutputType | null
    _avg: ProfileAvgAggregateOutputType | null
    _sum: ProfileSumAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  type GetProfileGroupByPayload<T extends ProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfileGroupByOutputType[P]>
            : GetScalarType<T[P], ProfileGroupByOutputType[P]>
        }
      >
    >


  export type ProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    age?: boolean
    regNo?: boolean
    liked?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    userProfile?: boolean | Profile$userProfileArgs<ExtArgs>
    parentInfo?: boolean | Profile$parentInfoArgs<ExtArgs>
    horoscopeProfile?: boolean | Profile$horoscopeProfileArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>



  export type ProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    age?: boolean
    regNo?: boolean
    liked?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "firstName" | "lastName" | "age" | "regNo" | "liked" | "createdAt" | "updatedAt", ExtArgs["result"]["profile"]>
  export type ProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    userProfile?: boolean | Profile$userProfileArgs<ExtArgs>
    parentInfo?: boolean | Profile$parentInfoArgs<ExtArgs>
    horoscopeProfile?: boolean | Profile$horoscopeProfileArgs<ExtArgs>
  }

  export type $ProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Profile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      userProfile: Prisma.$UserProfilePayload<ExtArgs> | null
      parentInfo: Prisma.$ParentInfoPayload<ExtArgs> | null
      horoscopeProfile: Prisma.$HoroscopeProfilePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      firstName: string
      lastName: string
      age: number | null
      regNo: string
      liked: boolean | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["profile"]>
    composites: {}
  }

  type ProfileGetPayload<S extends boolean | null | undefined | ProfileDefaultArgs> = $Result.GetResult<Prisma.$ProfilePayload, S>

  type ProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfileCountAggregateInputType | true
    }

  export interface ProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Profile'], meta: { name: 'Profile' } }
    /**
     * Find zero or one Profile that matches the filter.
     * @param {ProfileFindUniqueArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfileFindUniqueArgs>(args: SelectSubset<T, ProfileFindUniqueArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Profile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfileFindUniqueOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfileFindFirstArgs>(args?: SelectSubset<T, ProfileFindFirstArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Profiles
     * const profiles = await prisma.profile.findMany()
     * 
     * // Get first 10 Profiles
     * const profiles = await prisma.profile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const profileWithIdOnly = await prisma.profile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfileFindManyArgs>(args?: SelectSubset<T, ProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Profile.
     * @param {ProfileCreateArgs} args - Arguments to create a Profile.
     * @example
     * // Create one Profile
     * const Profile = await prisma.profile.create({
     *   data: {
     *     // ... data to create a Profile
     *   }
     * })
     * 
     */
    create<T extends ProfileCreateArgs>(args: SelectSubset<T, ProfileCreateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Profiles.
     * @param {ProfileCreateManyArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfileCreateManyArgs>(args?: SelectSubset<T, ProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Profile.
     * @param {ProfileDeleteArgs} args - Arguments to delete one Profile.
     * @example
     * // Delete one Profile
     * const Profile = await prisma.profile.delete({
     *   where: {
     *     // ... filter to delete one Profile
     *   }
     * })
     * 
     */
    delete<T extends ProfileDeleteArgs>(args: SelectSubset<T, ProfileDeleteArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Profile.
     * @param {ProfileUpdateArgs} args - Arguments to update one Profile.
     * @example
     * // Update one Profile
     * const profile = await prisma.profile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfileUpdateArgs>(args: SelectSubset<T, ProfileUpdateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Profiles.
     * @param {ProfileDeleteManyArgs} args - Arguments to filter Profiles to delete.
     * @example
     * // Delete a few Profiles
     * const { count } = await prisma.profile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfileDeleteManyArgs>(args?: SelectSubset<T, ProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfileUpdateManyArgs>(args: SelectSubset<T, ProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Profile.
     * @param {ProfileUpsertArgs} args - Arguments to update or create a Profile.
     * @example
     * // Update or create a Profile
     * const profile = await prisma.profile.upsert({
     *   create: {
     *     // ... data to create a Profile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Profile we want to update
     *   }
     * })
     */
    upsert<T extends ProfileUpsertArgs>(args: SelectSubset<T, ProfileUpsertArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileCountArgs} args - Arguments to filter Profiles to count.
     * @example
     * // Count the number of Profiles
     * const count = await prisma.profile.count({
     *   where: {
     *     // ... the filter for the Profiles we want to count
     *   }
     * })
    **/
    count<T extends ProfileCountArgs>(
      args?: Subset<T, ProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfileAggregateArgs>(args: Subset<T, ProfileAggregateArgs>): Prisma.PrismaPromise<GetProfileAggregateType<T>>

    /**
     * Group by Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfileGroupByArgs['orderBy'] }
        : { orderBy?: ProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Profile model
   */
  readonly fields: ProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Profile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    userProfile<T extends Profile$userProfileArgs<ExtArgs> = {}>(args?: Subset<T, Profile$userProfileArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    parentInfo<T extends Profile$parentInfoArgs<ExtArgs> = {}>(args?: Subset<T, Profile$parentInfoArgs<ExtArgs>>): Prisma__ParentInfoClient<$Result.GetResult<Prisma.$ParentInfoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    horoscopeProfile<T extends Profile$horoscopeProfileArgs<ExtArgs> = {}>(args?: Subset<T, Profile$horoscopeProfileArgs<ExtArgs>>): Prisma__HoroscopeProfileClient<$Result.GetResult<Prisma.$HoroscopeProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Profile model
   */
  interface ProfileFieldRefs {
    readonly id: FieldRef<"Profile", 'Int'>
    readonly userId: FieldRef<"Profile", 'Int'>
    readonly firstName: FieldRef<"Profile", 'String'>
    readonly lastName: FieldRef<"Profile", 'String'>
    readonly age: FieldRef<"Profile", 'Int'>
    readonly regNo: FieldRef<"Profile", 'String'>
    readonly liked: FieldRef<"Profile", 'Boolean'>
    readonly createdAt: FieldRef<"Profile", 'DateTime'>
    readonly updatedAt: FieldRef<"Profile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Profile findUnique
   */
  export type ProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findUniqueOrThrow
   */
  export type ProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findFirst
   */
  export type ProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findFirstOrThrow
   */
  export type ProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findMany
   */
  export type ProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profiles to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile create
   */
  export type ProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a Profile.
     */
    data: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
  }

  /**
   * Profile createMany
   */
  export type ProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Profile update
   */
  export type ProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a Profile.
     */
    data: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
    /**
     * Choose, which Profile to update.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile updateMany
   */
  export type ProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Profiles.
     */
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to update.
     */
    limit?: number
  }

  /**
   * Profile upsert
   */
  export type ProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the Profile to update in case it exists.
     */
    where: ProfileWhereUniqueInput
    /**
     * In case the Profile found by the `where` argument doesn't exist, create a new Profile with this data.
     */
    create: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
    /**
     * In case the Profile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
  }

  /**
   * Profile delete
   */
  export type ProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter which Profile to delete.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile deleteMany
   */
  export type ProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profiles to delete
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to delete.
     */
    limit?: number
  }

  /**
   * Profile.userProfile
   */
  export type Profile$userProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    where?: UserProfileWhereInput
  }

  /**
   * Profile.parentInfo
   */
  export type Profile$parentInfoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentInfo
     */
    select?: ParentInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentInfo
     */
    omit?: ParentInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentInfoInclude<ExtArgs> | null
    where?: ParentInfoWhereInput
  }

  /**
   * Profile.horoscopeProfile
   */
  export type Profile$horoscopeProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoroscopeProfile
     */
    select?: HoroscopeProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HoroscopeProfile
     */
    omit?: HoroscopeProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoroscopeProfileInclude<ExtArgs> | null
    where?: HoroscopeProfileWhereInput
  }

  /**
   * Profile without action
   */
  export type ProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
  }


  /**
   * Model UserProfile
   */

  export type AggregateUserProfile = {
    _count: UserProfileCountAggregateOutputType | null
    _avg: UserProfileAvgAggregateOutputType | null
    _sum: UserProfileSumAggregateOutputType | null
    _min: UserProfileMinAggregateOutputType | null
    _max: UserProfileMaxAggregateOutputType | null
  }

  export type UserProfileAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    age: number | null
  }

  export type UserProfileSumAggregateOutputType = {
    id: number | null
    userId: number | null
    age: number | null
  }

  export type UserProfileMinAggregateOutputType = {
    id: number | null
    userId: number | null
    type: string | null
    dietType: string | null
    dob: Date | null
    age: number | null
    height: string | null
    color: string | null
    education: string | null
    career: string | null
    salary: string | null
    familyProperty: string | null
    expectation: string | null
    phone: string | null
    caste: string | null
    marriageStatus: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserProfileMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    type: string | null
    dietType: string | null
    dob: Date | null
    age: number | null
    height: string | null
    color: string | null
    education: string | null
    career: string | null
    salary: string | null
    familyProperty: string | null
    expectation: string | null
    phone: string | null
    caste: string | null
    marriageStatus: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserProfileCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    dietType: number
    dob: number
    age: number
    height: number
    color: number
    education: number
    career: number
    salary: number
    familyProperty: number
    expectation: number
    phone: number
    caste: number
    marriageStatus: number
    profilePhotos: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserProfileAvgAggregateInputType = {
    id?: true
    userId?: true
    age?: true
  }

  export type UserProfileSumAggregateInputType = {
    id?: true
    userId?: true
    age?: true
  }

  export type UserProfileMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    dietType?: true
    dob?: true
    age?: true
    height?: true
    color?: true
    education?: true
    career?: true
    salary?: true
    familyProperty?: true
    expectation?: true
    phone?: true
    caste?: true
    marriageStatus?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    dietType?: true
    dob?: true
    age?: true
    height?: true
    color?: true
    education?: true
    career?: true
    salary?: true
    familyProperty?: true
    expectation?: true
    phone?: true
    caste?: true
    marriageStatus?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserProfileCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    dietType?: true
    dob?: true
    age?: true
    height?: true
    color?: true
    education?: true
    career?: true
    salary?: true
    familyProperty?: true
    expectation?: true
    phone?: true
    caste?: true
    marriageStatus?: true
    profilePhotos?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserProfile to aggregate.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserProfiles
    **/
    _count?: true | UserProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserProfileMaxAggregateInputType
  }

  export type GetUserProfileAggregateType<T extends UserProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateUserProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserProfile[P]>
      : GetScalarType<T[P], AggregateUserProfile[P]>
  }




  export type UserProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserProfileWhereInput
    orderBy?: UserProfileOrderByWithAggregationInput | UserProfileOrderByWithAggregationInput[]
    by: UserProfileScalarFieldEnum[] | UserProfileScalarFieldEnum
    having?: UserProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserProfileCountAggregateInputType | true
    _avg?: UserProfileAvgAggregateInputType
    _sum?: UserProfileSumAggregateInputType
    _min?: UserProfileMinAggregateInputType
    _max?: UserProfileMaxAggregateInputType
  }

  export type UserProfileGroupByOutputType = {
    id: number
    userId: number
    type: string
    dietType: string
    dob: Date
    age: number
    height: string
    color: string
    education: string
    career: string
    salary: string
    familyProperty: string
    expectation: string
    phone: string
    caste: string
    marriageStatus: string
    profilePhotos: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: UserProfileCountAggregateOutputType | null
    _avg: UserProfileAvgAggregateOutputType | null
    _sum: UserProfileSumAggregateOutputType | null
    _min: UserProfileMinAggregateOutputType | null
    _max: UserProfileMaxAggregateOutputType | null
  }

  type GetUserProfileGroupByPayload<T extends UserProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserProfileGroupByOutputType[P]>
            : GetScalarType<T[P], UserProfileGroupByOutputType[P]>
        }
      >
    >


  export type UserProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    dietType?: boolean
    dob?: boolean
    age?: boolean
    height?: boolean
    color?: boolean
    education?: boolean
    career?: boolean
    salary?: boolean
    familyProperty?: boolean
    expectation?: boolean
    phone?: boolean
    caste?: boolean
    marriageStatus?: boolean
    profilePhotos?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userProfile"]>



  export type UserProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    dietType?: boolean
    dob?: boolean
    age?: boolean
    height?: boolean
    color?: boolean
    education?: boolean
    career?: boolean
    salary?: boolean
    familyProperty?: boolean
    expectation?: boolean
    phone?: boolean
    caste?: boolean
    marriageStatus?: boolean
    profilePhotos?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "dietType" | "dob" | "age" | "height" | "color" | "education" | "career" | "salary" | "familyProperty" | "expectation" | "phone" | "caste" | "marriageStatus" | "profilePhotos" | "createdAt" | "updatedAt", ExtArgs["result"]["userProfile"]>
  export type UserProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }

  export type $UserProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserProfile"
    objects: {
      profile: Prisma.$ProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      type: string
      dietType: string
      dob: Date
      age: number
      height: string
      color: string
      education: string
      career: string
      salary: string
      familyProperty: string
      expectation: string
      phone: string
      caste: string
      marriageStatus: string
      profilePhotos: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userProfile"]>
    composites: {}
  }

  type UserProfileGetPayload<S extends boolean | null | undefined | UserProfileDefaultArgs> = $Result.GetResult<Prisma.$UserProfilePayload, S>

  type UserProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserProfileCountAggregateInputType | true
    }

  export interface UserProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserProfile'], meta: { name: 'UserProfile' } }
    /**
     * Find zero or one UserProfile that matches the filter.
     * @param {UserProfileFindUniqueArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserProfileFindUniqueArgs>(args: SelectSubset<T, UserProfileFindUniqueArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserProfileFindUniqueOrThrowArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, UserProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileFindFirstArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserProfileFindFirstArgs>(args?: SelectSubset<T, UserProfileFindFirstArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileFindFirstOrThrowArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, UserProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserProfiles
     * const userProfiles = await prisma.userProfile.findMany()
     * 
     * // Get first 10 UserProfiles
     * const userProfiles = await prisma.userProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userProfileWithIdOnly = await prisma.userProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserProfileFindManyArgs>(args?: SelectSubset<T, UserProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserProfile.
     * @param {UserProfileCreateArgs} args - Arguments to create a UserProfile.
     * @example
     * // Create one UserProfile
     * const UserProfile = await prisma.userProfile.create({
     *   data: {
     *     // ... data to create a UserProfile
     *   }
     * })
     * 
     */
    create<T extends UserProfileCreateArgs>(args: SelectSubset<T, UserProfileCreateArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserProfiles.
     * @param {UserProfileCreateManyArgs} args - Arguments to create many UserProfiles.
     * @example
     * // Create many UserProfiles
     * const userProfile = await prisma.userProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserProfileCreateManyArgs>(args?: SelectSubset<T, UserProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a UserProfile.
     * @param {UserProfileDeleteArgs} args - Arguments to delete one UserProfile.
     * @example
     * // Delete one UserProfile
     * const UserProfile = await prisma.userProfile.delete({
     *   where: {
     *     // ... filter to delete one UserProfile
     *   }
     * })
     * 
     */
    delete<T extends UserProfileDeleteArgs>(args: SelectSubset<T, UserProfileDeleteArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserProfile.
     * @param {UserProfileUpdateArgs} args - Arguments to update one UserProfile.
     * @example
     * // Update one UserProfile
     * const userProfile = await prisma.userProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserProfileUpdateArgs>(args: SelectSubset<T, UserProfileUpdateArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserProfiles.
     * @param {UserProfileDeleteManyArgs} args - Arguments to filter UserProfiles to delete.
     * @example
     * // Delete a few UserProfiles
     * const { count } = await prisma.userProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserProfileDeleteManyArgs>(args?: SelectSubset<T, UserProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserProfiles
     * const userProfile = await prisma.userProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserProfileUpdateManyArgs>(args: SelectSubset<T, UserProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserProfile.
     * @param {UserProfileUpsertArgs} args - Arguments to update or create a UserProfile.
     * @example
     * // Update or create a UserProfile
     * const userProfile = await prisma.userProfile.upsert({
     *   create: {
     *     // ... data to create a UserProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserProfile we want to update
     *   }
     * })
     */
    upsert<T extends UserProfileUpsertArgs>(args: SelectSubset<T, UserProfileUpsertArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileCountArgs} args - Arguments to filter UserProfiles to count.
     * @example
     * // Count the number of UserProfiles
     * const count = await prisma.userProfile.count({
     *   where: {
     *     // ... the filter for the UserProfiles we want to count
     *   }
     * })
    **/
    count<T extends UserProfileCountArgs>(
      args?: Subset<T, UserProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserProfileAggregateArgs>(args: Subset<T, UserProfileAggregateArgs>): Prisma.PrismaPromise<GetUserProfileAggregateType<T>>

    /**
     * Group by UserProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserProfileGroupByArgs['orderBy'] }
        : { orderBy?: UserProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserProfile model
   */
  readonly fields: UserProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserProfile model
   */
  interface UserProfileFieldRefs {
    readonly id: FieldRef<"UserProfile", 'Int'>
    readonly userId: FieldRef<"UserProfile", 'Int'>
    readonly type: FieldRef<"UserProfile", 'String'>
    readonly dietType: FieldRef<"UserProfile", 'String'>
    readonly dob: FieldRef<"UserProfile", 'DateTime'>
    readonly age: FieldRef<"UserProfile", 'Int'>
    readonly height: FieldRef<"UserProfile", 'String'>
    readonly color: FieldRef<"UserProfile", 'String'>
    readonly education: FieldRef<"UserProfile", 'String'>
    readonly career: FieldRef<"UserProfile", 'String'>
    readonly salary: FieldRef<"UserProfile", 'String'>
    readonly familyProperty: FieldRef<"UserProfile", 'String'>
    readonly expectation: FieldRef<"UserProfile", 'String'>
    readonly phone: FieldRef<"UserProfile", 'String'>
    readonly caste: FieldRef<"UserProfile", 'String'>
    readonly marriageStatus: FieldRef<"UserProfile", 'String'>
    readonly profilePhotos: FieldRef<"UserProfile", 'Json'>
    readonly createdAt: FieldRef<"UserProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"UserProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserProfile findUnique
   */
  export type UserProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile findUniqueOrThrow
   */
  export type UserProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile findFirst
   */
  export type UserProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserProfiles.
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserProfiles.
     */
    distinct?: UserProfileScalarFieldEnum | UserProfileScalarFieldEnum[]
  }

  /**
   * UserProfile findFirstOrThrow
   */
  export type UserProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserProfiles.
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserProfiles.
     */
    distinct?: UserProfileScalarFieldEnum | UserProfileScalarFieldEnum[]
  }

  /**
   * UserProfile findMany
   */
  export type UserProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfiles to fetch.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserProfiles.
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    distinct?: UserProfileScalarFieldEnum | UserProfileScalarFieldEnum[]
  }

  /**
   * UserProfile create
   */
  export type UserProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a UserProfile.
     */
    data: XOR<UserProfileCreateInput, UserProfileUncheckedCreateInput>
  }

  /**
   * UserProfile createMany
   */
  export type UserProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserProfiles.
     */
    data: UserProfileCreateManyInput | UserProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserProfile update
   */
  export type UserProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a UserProfile.
     */
    data: XOR<UserProfileUpdateInput, UserProfileUncheckedUpdateInput>
    /**
     * Choose, which UserProfile to update.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile updateMany
   */
  export type UserProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserProfiles.
     */
    data: XOR<UserProfileUpdateManyMutationInput, UserProfileUncheckedUpdateManyInput>
    /**
     * Filter which UserProfiles to update
     */
    where?: UserProfileWhereInput
    /**
     * Limit how many UserProfiles to update.
     */
    limit?: number
  }

  /**
   * UserProfile upsert
   */
  export type UserProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the UserProfile to update in case it exists.
     */
    where: UserProfileWhereUniqueInput
    /**
     * In case the UserProfile found by the `where` argument doesn't exist, create a new UserProfile with this data.
     */
    create: XOR<UserProfileCreateInput, UserProfileUncheckedCreateInput>
    /**
     * In case the UserProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserProfileUpdateInput, UserProfileUncheckedUpdateInput>
  }

  /**
   * UserProfile delete
   */
  export type UserProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter which UserProfile to delete.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile deleteMany
   */
  export type UserProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserProfiles to delete
     */
    where?: UserProfileWhereInput
    /**
     * Limit how many UserProfiles to delete.
     */
    limit?: number
  }

  /**
   * UserProfile without action
   */
  export type UserProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
  }


  /**
   * Model ParentInfo
   */

  export type AggregateParentInfo = {
    _count: ParentInfoCountAggregateOutputType | null
    _avg: ParentInfoAvgAggregateOutputType | null
    _sum: ParentInfoSumAggregateOutputType | null
    _min: ParentInfoMinAggregateOutputType | null
    _max: ParentInfoMaxAggregateOutputType | null
  }

  export type ParentInfoAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    brothers: number | null
    elderBrothers: number | null
    youngerBrothers: number | null
    marriedBrothers: number | null
    sisters: number | null
    elderSisters: number | null
    youngerSisters: number | null
    marriedSisters: number | null
  }

  export type ParentInfoSumAggregateOutputType = {
    id: number | null
    userId: number | null
    brothers: number | null
    elderBrothers: number | null
    youngerBrothers: number | null
    marriedBrothers: number | null
    sisters: number | null
    elderSisters: number | null
    youngerSisters: number | null
    marriedSisters: number | null
  }

  export type ParentInfoMinAggregateOutputType = {
    id: number | null
    userId: number | null
    fatherName: string | null
    motherName: string | null
    fatherNative: string | null
    motherNative: string | null
    fatherProfession: string | null
    motherProfession: string | null
    phone: string | null
    address: string | null
    brothers: number | null
    elderBrothers: number | null
    youngerBrothers: number | null
    marriedBrothers: number | null
    sisters: number | null
    elderSisters: number | null
    youngerSisters: number | null
    marriedSisters: number | null
  }

  export type ParentInfoMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    fatherName: string | null
    motherName: string | null
    fatherNative: string | null
    motherNative: string | null
    fatherProfession: string | null
    motherProfession: string | null
    phone: string | null
    address: string | null
    brothers: number | null
    elderBrothers: number | null
    youngerBrothers: number | null
    marriedBrothers: number | null
    sisters: number | null
    elderSisters: number | null
    youngerSisters: number | null
    marriedSisters: number | null
  }

  export type ParentInfoCountAggregateOutputType = {
    id: number
    userId: number
    fatherName: number
    motherName: number
    fatherNative: number
    motherNative: number
    fatherProfession: number
    motherProfession: number
    phone: number
    address: number
    brothers: number
    elderBrothers: number
    youngerBrothers: number
    marriedBrothers: number
    sisters: number
    elderSisters: number
    youngerSisters: number
    marriedSisters: number
    _all: number
  }


  export type ParentInfoAvgAggregateInputType = {
    id?: true
    userId?: true
    brothers?: true
    elderBrothers?: true
    youngerBrothers?: true
    marriedBrothers?: true
    sisters?: true
    elderSisters?: true
    youngerSisters?: true
    marriedSisters?: true
  }

  export type ParentInfoSumAggregateInputType = {
    id?: true
    userId?: true
    brothers?: true
    elderBrothers?: true
    youngerBrothers?: true
    marriedBrothers?: true
    sisters?: true
    elderSisters?: true
    youngerSisters?: true
    marriedSisters?: true
  }

  export type ParentInfoMinAggregateInputType = {
    id?: true
    userId?: true
    fatherName?: true
    motherName?: true
    fatherNative?: true
    motherNative?: true
    fatherProfession?: true
    motherProfession?: true
    phone?: true
    address?: true
    brothers?: true
    elderBrothers?: true
    youngerBrothers?: true
    marriedBrothers?: true
    sisters?: true
    elderSisters?: true
    youngerSisters?: true
    marriedSisters?: true
  }

  export type ParentInfoMaxAggregateInputType = {
    id?: true
    userId?: true
    fatherName?: true
    motherName?: true
    fatherNative?: true
    motherNative?: true
    fatherProfession?: true
    motherProfession?: true
    phone?: true
    address?: true
    brothers?: true
    elderBrothers?: true
    youngerBrothers?: true
    marriedBrothers?: true
    sisters?: true
    elderSisters?: true
    youngerSisters?: true
    marriedSisters?: true
  }

  export type ParentInfoCountAggregateInputType = {
    id?: true
    userId?: true
    fatherName?: true
    motherName?: true
    fatherNative?: true
    motherNative?: true
    fatherProfession?: true
    motherProfession?: true
    phone?: true
    address?: true
    brothers?: true
    elderBrothers?: true
    youngerBrothers?: true
    marriedBrothers?: true
    sisters?: true
    elderSisters?: true
    youngerSisters?: true
    marriedSisters?: true
    _all?: true
  }

  export type ParentInfoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ParentInfo to aggregate.
     */
    where?: ParentInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParentInfos to fetch.
     */
    orderBy?: ParentInfoOrderByWithRelationInput | ParentInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ParentInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParentInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParentInfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ParentInfos
    **/
    _count?: true | ParentInfoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ParentInfoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ParentInfoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ParentInfoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ParentInfoMaxAggregateInputType
  }

  export type GetParentInfoAggregateType<T extends ParentInfoAggregateArgs> = {
        [P in keyof T & keyof AggregateParentInfo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateParentInfo[P]>
      : GetScalarType<T[P], AggregateParentInfo[P]>
  }




  export type ParentInfoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParentInfoWhereInput
    orderBy?: ParentInfoOrderByWithAggregationInput | ParentInfoOrderByWithAggregationInput[]
    by: ParentInfoScalarFieldEnum[] | ParentInfoScalarFieldEnum
    having?: ParentInfoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ParentInfoCountAggregateInputType | true
    _avg?: ParentInfoAvgAggregateInputType
    _sum?: ParentInfoSumAggregateInputType
    _min?: ParentInfoMinAggregateInputType
    _max?: ParentInfoMaxAggregateInputType
  }

  export type ParentInfoGroupByOutputType = {
    id: number
    userId: number
    fatherName: string
    motherName: string
    fatherNative: string
    motherNative: string
    fatherProfession: string
    motherProfession: string
    phone: string
    address: string
    brothers: number
    elderBrothers: number
    youngerBrothers: number
    marriedBrothers: number
    sisters: number
    elderSisters: number
    youngerSisters: number
    marriedSisters: number
    _count: ParentInfoCountAggregateOutputType | null
    _avg: ParentInfoAvgAggregateOutputType | null
    _sum: ParentInfoSumAggregateOutputType | null
    _min: ParentInfoMinAggregateOutputType | null
    _max: ParentInfoMaxAggregateOutputType | null
  }

  type GetParentInfoGroupByPayload<T extends ParentInfoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ParentInfoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ParentInfoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ParentInfoGroupByOutputType[P]>
            : GetScalarType<T[P], ParentInfoGroupByOutputType[P]>
        }
      >
    >


  export type ParentInfoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fatherName?: boolean
    motherName?: boolean
    fatherNative?: boolean
    motherNative?: boolean
    fatherProfession?: boolean
    motherProfession?: boolean
    phone?: boolean
    address?: boolean
    brothers?: boolean
    elderBrothers?: boolean
    youngerBrothers?: boolean
    marriedBrothers?: boolean
    sisters?: boolean
    elderSisters?: boolean
    youngerSisters?: boolean
    marriedSisters?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["parentInfo"]>



  export type ParentInfoSelectScalar = {
    id?: boolean
    userId?: boolean
    fatherName?: boolean
    motherName?: boolean
    fatherNative?: boolean
    motherNative?: boolean
    fatherProfession?: boolean
    motherProfession?: boolean
    phone?: boolean
    address?: boolean
    brothers?: boolean
    elderBrothers?: boolean
    youngerBrothers?: boolean
    marriedBrothers?: boolean
    sisters?: boolean
    elderSisters?: boolean
    youngerSisters?: boolean
    marriedSisters?: boolean
  }

  export type ParentInfoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "fatherName" | "motherName" | "fatherNative" | "motherNative" | "fatherProfession" | "motherProfession" | "phone" | "address" | "brothers" | "elderBrothers" | "youngerBrothers" | "marriedBrothers" | "sisters" | "elderSisters" | "youngerSisters" | "marriedSisters", ExtArgs["result"]["parentInfo"]>
  export type ParentInfoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }

  export type $ParentInfoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ParentInfo"
    objects: {
      profile: Prisma.$ProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      fatherName: string
      motherName: string
      fatherNative: string
      motherNative: string
      fatherProfession: string
      motherProfession: string
      phone: string
      address: string
      brothers: number
      elderBrothers: number
      youngerBrothers: number
      marriedBrothers: number
      sisters: number
      elderSisters: number
      youngerSisters: number
      marriedSisters: number
    }, ExtArgs["result"]["parentInfo"]>
    composites: {}
  }

  type ParentInfoGetPayload<S extends boolean | null | undefined | ParentInfoDefaultArgs> = $Result.GetResult<Prisma.$ParentInfoPayload, S>

  type ParentInfoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ParentInfoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ParentInfoCountAggregateInputType | true
    }

  export interface ParentInfoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ParentInfo'], meta: { name: 'ParentInfo' } }
    /**
     * Find zero or one ParentInfo that matches the filter.
     * @param {ParentInfoFindUniqueArgs} args - Arguments to find a ParentInfo
     * @example
     * // Get one ParentInfo
     * const parentInfo = await prisma.parentInfo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ParentInfoFindUniqueArgs>(args: SelectSubset<T, ParentInfoFindUniqueArgs<ExtArgs>>): Prisma__ParentInfoClient<$Result.GetResult<Prisma.$ParentInfoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ParentInfo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ParentInfoFindUniqueOrThrowArgs} args - Arguments to find a ParentInfo
     * @example
     * // Get one ParentInfo
     * const parentInfo = await prisma.parentInfo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ParentInfoFindUniqueOrThrowArgs>(args: SelectSubset<T, ParentInfoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ParentInfoClient<$Result.GetResult<Prisma.$ParentInfoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ParentInfo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentInfoFindFirstArgs} args - Arguments to find a ParentInfo
     * @example
     * // Get one ParentInfo
     * const parentInfo = await prisma.parentInfo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ParentInfoFindFirstArgs>(args?: SelectSubset<T, ParentInfoFindFirstArgs<ExtArgs>>): Prisma__ParentInfoClient<$Result.GetResult<Prisma.$ParentInfoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ParentInfo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentInfoFindFirstOrThrowArgs} args - Arguments to find a ParentInfo
     * @example
     * // Get one ParentInfo
     * const parentInfo = await prisma.parentInfo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ParentInfoFindFirstOrThrowArgs>(args?: SelectSubset<T, ParentInfoFindFirstOrThrowArgs<ExtArgs>>): Prisma__ParentInfoClient<$Result.GetResult<Prisma.$ParentInfoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ParentInfos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentInfoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ParentInfos
     * const parentInfos = await prisma.parentInfo.findMany()
     * 
     * // Get first 10 ParentInfos
     * const parentInfos = await prisma.parentInfo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const parentInfoWithIdOnly = await prisma.parentInfo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ParentInfoFindManyArgs>(args?: SelectSubset<T, ParentInfoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParentInfoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ParentInfo.
     * @param {ParentInfoCreateArgs} args - Arguments to create a ParentInfo.
     * @example
     * // Create one ParentInfo
     * const ParentInfo = await prisma.parentInfo.create({
     *   data: {
     *     // ... data to create a ParentInfo
     *   }
     * })
     * 
     */
    create<T extends ParentInfoCreateArgs>(args: SelectSubset<T, ParentInfoCreateArgs<ExtArgs>>): Prisma__ParentInfoClient<$Result.GetResult<Prisma.$ParentInfoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ParentInfos.
     * @param {ParentInfoCreateManyArgs} args - Arguments to create many ParentInfos.
     * @example
     * // Create many ParentInfos
     * const parentInfo = await prisma.parentInfo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ParentInfoCreateManyArgs>(args?: SelectSubset<T, ParentInfoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ParentInfo.
     * @param {ParentInfoDeleteArgs} args - Arguments to delete one ParentInfo.
     * @example
     * // Delete one ParentInfo
     * const ParentInfo = await prisma.parentInfo.delete({
     *   where: {
     *     // ... filter to delete one ParentInfo
     *   }
     * })
     * 
     */
    delete<T extends ParentInfoDeleteArgs>(args: SelectSubset<T, ParentInfoDeleteArgs<ExtArgs>>): Prisma__ParentInfoClient<$Result.GetResult<Prisma.$ParentInfoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ParentInfo.
     * @param {ParentInfoUpdateArgs} args - Arguments to update one ParentInfo.
     * @example
     * // Update one ParentInfo
     * const parentInfo = await prisma.parentInfo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ParentInfoUpdateArgs>(args: SelectSubset<T, ParentInfoUpdateArgs<ExtArgs>>): Prisma__ParentInfoClient<$Result.GetResult<Prisma.$ParentInfoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ParentInfos.
     * @param {ParentInfoDeleteManyArgs} args - Arguments to filter ParentInfos to delete.
     * @example
     * // Delete a few ParentInfos
     * const { count } = await prisma.parentInfo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ParentInfoDeleteManyArgs>(args?: SelectSubset<T, ParentInfoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ParentInfos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentInfoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ParentInfos
     * const parentInfo = await prisma.parentInfo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ParentInfoUpdateManyArgs>(args: SelectSubset<T, ParentInfoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ParentInfo.
     * @param {ParentInfoUpsertArgs} args - Arguments to update or create a ParentInfo.
     * @example
     * // Update or create a ParentInfo
     * const parentInfo = await prisma.parentInfo.upsert({
     *   create: {
     *     // ... data to create a ParentInfo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ParentInfo we want to update
     *   }
     * })
     */
    upsert<T extends ParentInfoUpsertArgs>(args: SelectSubset<T, ParentInfoUpsertArgs<ExtArgs>>): Prisma__ParentInfoClient<$Result.GetResult<Prisma.$ParentInfoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ParentInfos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentInfoCountArgs} args - Arguments to filter ParentInfos to count.
     * @example
     * // Count the number of ParentInfos
     * const count = await prisma.parentInfo.count({
     *   where: {
     *     // ... the filter for the ParentInfos we want to count
     *   }
     * })
    **/
    count<T extends ParentInfoCountArgs>(
      args?: Subset<T, ParentInfoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ParentInfoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ParentInfo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentInfoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ParentInfoAggregateArgs>(args: Subset<T, ParentInfoAggregateArgs>): Prisma.PrismaPromise<GetParentInfoAggregateType<T>>

    /**
     * Group by ParentInfo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentInfoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ParentInfoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ParentInfoGroupByArgs['orderBy'] }
        : { orderBy?: ParentInfoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ParentInfoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetParentInfoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ParentInfo model
   */
  readonly fields: ParentInfoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ParentInfo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ParentInfoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ParentInfo model
   */
  interface ParentInfoFieldRefs {
    readonly id: FieldRef<"ParentInfo", 'Int'>
    readonly userId: FieldRef<"ParentInfo", 'Int'>
    readonly fatherName: FieldRef<"ParentInfo", 'String'>
    readonly motherName: FieldRef<"ParentInfo", 'String'>
    readonly fatherNative: FieldRef<"ParentInfo", 'String'>
    readonly motherNative: FieldRef<"ParentInfo", 'String'>
    readonly fatherProfession: FieldRef<"ParentInfo", 'String'>
    readonly motherProfession: FieldRef<"ParentInfo", 'String'>
    readonly phone: FieldRef<"ParentInfo", 'String'>
    readonly address: FieldRef<"ParentInfo", 'String'>
    readonly brothers: FieldRef<"ParentInfo", 'Int'>
    readonly elderBrothers: FieldRef<"ParentInfo", 'Int'>
    readonly youngerBrothers: FieldRef<"ParentInfo", 'Int'>
    readonly marriedBrothers: FieldRef<"ParentInfo", 'Int'>
    readonly sisters: FieldRef<"ParentInfo", 'Int'>
    readonly elderSisters: FieldRef<"ParentInfo", 'Int'>
    readonly youngerSisters: FieldRef<"ParentInfo", 'Int'>
    readonly marriedSisters: FieldRef<"ParentInfo", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * ParentInfo findUnique
   */
  export type ParentInfoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentInfo
     */
    select?: ParentInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentInfo
     */
    omit?: ParentInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentInfoInclude<ExtArgs> | null
    /**
     * Filter, which ParentInfo to fetch.
     */
    where: ParentInfoWhereUniqueInput
  }

  /**
   * ParentInfo findUniqueOrThrow
   */
  export type ParentInfoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentInfo
     */
    select?: ParentInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentInfo
     */
    omit?: ParentInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentInfoInclude<ExtArgs> | null
    /**
     * Filter, which ParentInfo to fetch.
     */
    where: ParentInfoWhereUniqueInput
  }

  /**
   * ParentInfo findFirst
   */
  export type ParentInfoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentInfo
     */
    select?: ParentInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentInfo
     */
    omit?: ParentInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentInfoInclude<ExtArgs> | null
    /**
     * Filter, which ParentInfo to fetch.
     */
    where?: ParentInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParentInfos to fetch.
     */
    orderBy?: ParentInfoOrderByWithRelationInput | ParentInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ParentInfos.
     */
    cursor?: ParentInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParentInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParentInfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ParentInfos.
     */
    distinct?: ParentInfoScalarFieldEnum | ParentInfoScalarFieldEnum[]
  }

  /**
   * ParentInfo findFirstOrThrow
   */
  export type ParentInfoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentInfo
     */
    select?: ParentInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentInfo
     */
    omit?: ParentInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentInfoInclude<ExtArgs> | null
    /**
     * Filter, which ParentInfo to fetch.
     */
    where?: ParentInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParentInfos to fetch.
     */
    orderBy?: ParentInfoOrderByWithRelationInput | ParentInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ParentInfos.
     */
    cursor?: ParentInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParentInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParentInfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ParentInfos.
     */
    distinct?: ParentInfoScalarFieldEnum | ParentInfoScalarFieldEnum[]
  }

  /**
   * ParentInfo findMany
   */
  export type ParentInfoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentInfo
     */
    select?: ParentInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentInfo
     */
    omit?: ParentInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentInfoInclude<ExtArgs> | null
    /**
     * Filter, which ParentInfos to fetch.
     */
    where?: ParentInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParentInfos to fetch.
     */
    orderBy?: ParentInfoOrderByWithRelationInput | ParentInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ParentInfos.
     */
    cursor?: ParentInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParentInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParentInfos.
     */
    skip?: number
    distinct?: ParentInfoScalarFieldEnum | ParentInfoScalarFieldEnum[]
  }

  /**
   * ParentInfo create
   */
  export type ParentInfoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentInfo
     */
    select?: ParentInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentInfo
     */
    omit?: ParentInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentInfoInclude<ExtArgs> | null
    /**
     * The data needed to create a ParentInfo.
     */
    data: XOR<ParentInfoCreateInput, ParentInfoUncheckedCreateInput>
  }

  /**
   * ParentInfo createMany
   */
  export type ParentInfoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ParentInfos.
     */
    data: ParentInfoCreateManyInput | ParentInfoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ParentInfo update
   */
  export type ParentInfoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentInfo
     */
    select?: ParentInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentInfo
     */
    omit?: ParentInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentInfoInclude<ExtArgs> | null
    /**
     * The data needed to update a ParentInfo.
     */
    data: XOR<ParentInfoUpdateInput, ParentInfoUncheckedUpdateInput>
    /**
     * Choose, which ParentInfo to update.
     */
    where: ParentInfoWhereUniqueInput
  }

  /**
   * ParentInfo updateMany
   */
  export type ParentInfoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ParentInfos.
     */
    data: XOR<ParentInfoUpdateManyMutationInput, ParentInfoUncheckedUpdateManyInput>
    /**
     * Filter which ParentInfos to update
     */
    where?: ParentInfoWhereInput
    /**
     * Limit how many ParentInfos to update.
     */
    limit?: number
  }

  /**
   * ParentInfo upsert
   */
  export type ParentInfoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentInfo
     */
    select?: ParentInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentInfo
     */
    omit?: ParentInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentInfoInclude<ExtArgs> | null
    /**
     * The filter to search for the ParentInfo to update in case it exists.
     */
    where: ParentInfoWhereUniqueInput
    /**
     * In case the ParentInfo found by the `where` argument doesn't exist, create a new ParentInfo with this data.
     */
    create: XOR<ParentInfoCreateInput, ParentInfoUncheckedCreateInput>
    /**
     * In case the ParentInfo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ParentInfoUpdateInput, ParentInfoUncheckedUpdateInput>
  }

  /**
   * ParentInfo delete
   */
  export type ParentInfoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentInfo
     */
    select?: ParentInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentInfo
     */
    omit?: ParentInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentInfoInclude<ExtArgs> | null
    /**
     * Filter which ParentInfo to delete.
     */
    where: ParentInfoWhereUniqueInput
  }

  /**
   * ParentInfo deleteMany
   */
  export type ParentInfoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ParentInfos to delete
     */
    where?: ParentInfoWhereInput
    /**
     * Limit how many ParentInfos to delete.
     */
    limit?: number
  }

  /**
   * ParentInfo without action
   */
  export type ParentInfoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentInfo
     */
    select?: ParentInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentInfo
     */
    omit?: ParentInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentInfoInclude<ExtArgs> | null
  }


  /**
   * Model HoroscopeProfile
   */

  export type AggregateHoroscopeProfile = {
    _count: HoroscopeProfileCountAggregateOutputType | null
    _avg: HoroscopeProfileAvgAggregateOutputType | null
    _sum: HoroscopeProfileSumAggregateOutputType | null
    _min: HoroscopeProfileMinAggregateOutputType | null
    _max: HoroscopeProfileMaxAggregateOutputType | null
  }

  export type HoroscopeProfileAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type HoroscopeProfileSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type HoroscopeProfileMinAggregateOutputType = {
    id: number | null
    userId: number | null
    zodiacSign: string | null
    tamilYear: string | null
    tamilMonth: string | null
    udayathiNatchat: string | null
    day: string | null
    birthTime: string | null
    starFoot: string | null
    ascendant: string | null
    birthplace: string | null
    natalDirection: string | null
  }

  export type HoroscopeProfileMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    zodiacSign: string | null
    tamilYear: string | null
    tamilMonth: string | null
    udayathiNatchat: string | null
    day: string | null
    birthTime: string | null
    starFoot: string | null
    ascendant: string | null
    birthplace: string | null
    natalDirection: string | null
  }

  export type HoroscopeProfileCountAggregateOutputType = {
    id: number
    userId: number
    zodiacSign: number
    tamilYear: number
    tamilMonth: number
    udayathiNatchat: number
    day: number
    birthTime: number
    starFoot: number
    ascendant: number
    birthplace: number
    natalDirection: number
    horoscopeDocuments: number
    _all: number
  }


  export type HoroscopeProfileAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type HoroscopeProfileSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type HoroscopeProfileMinAggregateInputType = {
    id?: true
    userId?: true
    zodiacSign?: true
    tamilYear?: true
    tamilMonth?: true
    udayathiNatchat?: true
    day?: true
    birthTime?: true
    starFoot?: true
    ascendant?: true
    birthplace?: true
    natalDirection?: true
  }

  export type HoroscopeProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    zodiacSign?: true
    tamilYear?: true
    tamilMonth?: true
    udayathiNatchat?: true
    day?: true
    birthTime?: true
    starFoot?: true
    ascendant?: true
    birthplace?: true
    natalDirection?: true
  }

  export type HoroscopeProfileCountAggregateInputType = {
    id?: true
    userId?: true
    zodiacSign?: true
    tamilYear?: true
    tamilMonth?: true
    udayathiNatchat?: true
    day?: true
    birthTime?: true
    starFoot?: true
    ascendant?: true
    birthplace?: true
    natalDirection?: true
    horoscopeDocuments?: true
    _all?: true
  }

  export type HoroscopeProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HoroscopeProfile to aggregate.
     */
    where?: HoroscopeProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HoroscopeProfiles to fetch.
     */
    orderBy?: HoroscopeProfileOrderByWithRelationInput | HoroscopeProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HoroscopeProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HoroscopeProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HoroscopeProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HoroscopeProfiles
    **/
    _count?: true | HoroscopeProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HoroscopeProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HoroscopeProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HoroscopeProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HoroscopeProfileMaxAggregateInputType
  }

  export type GetHoroscopeProfileAggregateType<T extends HoroscopeProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateHoroscopeProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHoroscopeProfile[P]>
      : GetScalarType<T[P], AggregateHoroscopeProfile[P]>
  }




  export type HoroscopeProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HoroscopeProfileWhereInput
    orderBy?: HoroscopeProfileOrderByWithAggregationInput | HoroscopeProfileOrderByWithAggregationInput[]
    by: HoroscopeProfileScalarFieldEnum[] | HoroscopeProfileScalarFieldEnum
    having?: HoroscopeProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HoroscopeProfileCountAggregateInputType | true
    _avg?: HoroscopeProfileAvgAggregateInputType
    _sum?: HoroscopeProfileSumAggregateInputType
    _min?: HoroscopeProfileMinAggregateInputType
    _max?: HoroscopeProfileMaxAggregateInputType
  }

  export type HoroscopeProfileGroupByOutputType = {
    id: number
    userId: number
    zodiacSign: string
    tamilYear: string
    tamilMonth: string
    udayathiNatchat: string
    day: string
    birthTime: string
    starFoot: string
    ascendant: string
    birthplace: string
    natalDirection: string
    horoscopeDocuments: JsonValue | null
    _count: HoroscopeProfileCountAggregateOutputType | null
    _avg: HoroscopeProfileAvgAggregateOutputType | null
    _sum: HoroscopeProfileSumAggregateOutputType | null
    _min: HoroscopeProfileMinAggregateOutputType | null
    _max: HoroscopeProfileMaxAggregateOutputType | null
  }

  type GetHoroscopeProfileGroupByPayload<T extends HoroscopeProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HoroscopeProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HoroscopeProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HoroscopeProfileGroupByOutputType[P]>
            : GetScalarType<T[P], HoroscopeProfileGroupByOutputType[P]>
        }
      >
    >


  export type HoroscopeProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    zodiacSign?: boolean
    tamilYear?: boolean
    tamilMonth?: boolean
    udayathiNatchat?: boolean
    day?: boolean
    birthTime?: boolean
    starFoot?: boolean
    ascendant?: boolean
    birthplace?: boolean
    natalDirection?: boolean
    horoscopeDocuments?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["horoscopeProfile"]>



  export type HoroscopeProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    zodiacSign?: boolean
    tamilYear?: boolean
    tamilMonth?: boolean
    udayathiNatchat?: boolean
    day?: boolean
    birthTime?: boolean
    starFoot?: boolean
    ascendant?: boolean
    birthplace?: boolean
    natalDirection?: boolean
    horoscopeDocuments?: boolean
  }

  export type HoroscopeProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "zodiacSign" | "tamilYear" | "tamilMonth" | "udayathiNatchat" | "day" | "birthTime" | "starFoot" | "ascendant" | "birthplace" | "natalDirection" | "horoscopeDocuments", ExtArgs["result"]["horoscopeProfile"]>
  export type HoroscopeProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }

  export type $HoroscopeProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HoroscopeProfile"
    objects: {
      profile: Prisma.$ProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      zodiacSign: string
      tamilYear: string
      tamilMonth: string
      udayathiNatchat: string
      day: string
      birthTime: string
      starFoot: string
      ascendant: string
      birthplace: string
      natalDirection: string
      horoscopeDocuments: Prisma.JsonValue | null
    }, ExtArgs["result"]["horoscopeProfile"]>
    composites: {}
  }

  type HoroscopeProfileGetPayload<S extends boolean | null | undefined | HoroscopeProfileDefaultArgs> = $Result.GetResult<Prisma.$HoroscopeProfilePayload, S>

  type HoroscopeProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HoroscopeProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HoroscopeProfileCountAggregateInputType | true
    }

  export interface HoroscopeProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HoroscopeProfile'], meta: { name: 'HoroscopeProfile' } }
    /**
     * Find zero or one HoroscopeProfile that matches the filter.
     * @param {HoroscopeProfileFindUniqueArgs} args - Arguments to find a HoroscopeProfile
     * @example
     * // Get one HoroscopeProfile
     * const horoscopeProfile = await prisma.horoscopeProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HoroscopeProfileFindUniqueArgs>(args: SelectSubset<T, HoroscopeProfileFindUniqueArgs<ExtArgs>>): Prisma__HoroscopeProfileClient<$Result.GetResult<Prisma.$HoroscopeProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one HoroscopeProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HoroscopeProfileFindUniqueOrThrowArgs} args - Arguments to find a HoroscopeProfile
     * @example
     * // Get one HoroscopeProfile
     * const horoscopeProfile = await prisma.horoscopeProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HoroscopeProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, HoroscopeProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HoroscopeProfileClient<$Result.GetResult<Prisma.$HoroscopeProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HoroscopeProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoroscopeProfileFindFirstArgs} args - Arguments to find a HoroscopeProfile
     * @example
     * // Get one HoroscopeProfile
     * const horoscopeProfile = await prisma.horoscopeProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HoroscopeProfileFindFirstArgs>(args?: SelectSubset<T, HoroscopeProfileFindFirstArgs<ExtArgs>>): Prisma__HoroscopeProfileClient<$Result.GetResult<Prisma.$HoroscopeProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HoroscopeProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoroscopeProfileFindFirstOrThrowArgs} args - Arguments to find a HoroscopeProfile
     * @example
     * // Get one HoroscopeProfile
     * const horoscopeProfile = await prisma.horoscopeProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HoroscopeProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, HoroscopeProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__HoroscopeProfileClient<$Result.GetResult<Prisma.$HoroscopeProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more HoroscopeProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoroscopeProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HoroscopeProfiles
     * const horoscopeProfiles = await prisma.horoscopeProfile.findMany()
     * 
     * // Get first 10 HoroscopeProfiles
     * const horoscopeProfiles = await prisma.horoscopeProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const horoscopeProfileWithIdOnly = await prisma.horoscopeProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HoroscopeProfileFindManyArgs>(args?: SelectSubset<T, HoroscopeProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HoroscopeProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a HoroscopeProfile.
     * @param {HoroscopeProfileCreateArgs} args - Arguments to create a HoroscopeProfile.
     * @example
     * // Create one HoroscopeProfile
     * const HoroscopeProfile = await prisma.horoscopeProfile.create({
     *   data: {
     *     // ... data to create a HoroscopeProfile
     *   }
     * })
     * 
     */
    create<T extends HoroscopeProfileCreateArgs>(args: SelectSubset<T, HoroscopeProfileCreateArgs<ExtArgs>>): Prisma__HoroscopeProfileClient<$Result.GetResult<Prisma.$HoroscopeProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many HoroscopeProfiles.
     * @param {HoroscopeProfileCreateManyArgs} args - Arguments to create many HoroscopeProfiles.
     * @example
     * // Create many HoroscopeProfiles
     * const horoscopeProfile = await prisma.horoscopeProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HoroscopeProfileCreateManyArgs>(args?: SelectSubset<T, HoroscopeProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a HoroscopeProfile.
     * @param {HoroscopeProfileDeleteArgs} args - Arguments to delete one HoroscopeProfile.
     * @example
     * // Delete one HoroscopeProfile
     * const HoroscopeProfile = await prisma.horoscopeProfile.delete({
     *   where: {
     *     // ... filter to delete one HoroscopeProfile
     *   }
     * })
     * 
     */
    delete<T extends HoroscopeProfileDeleteArgs>(args: SelectSubset<T, HoroscopeProfileDeleteArgs<ExtArgs>>): Prisma__HoroscopeProfileClient<$Result.GetResult<Prisma.$HoroscopeProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one HoroscopeProfile.
     * @param {HoroscopeProfileUpdateArgs} args - Arguments to update one HoroscopeProfile.
     * @example
     * // Update one HoroscopeProfile
     * const horoscopeProfile = await prisma.horoscopeProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HoroscopeProfileUpdateArgs>(args: SelectSubset<T, HoroscopeProfileUpdateArgs<ExtArgs>>): Prisma__HoroscopeProfileClient<$Result.GetResult<Prisma.$HoroscopeProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more HoroscopeProfiles.
     * @param {HoroscopeProfileDeleteManyArgs} args - Arguments to filter HoroscopeProfiles to delete.
     * @example
     * // Delete a few HoroscopeProfiles
     * const { count } = await prisma.horoscopeProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HoroscopeProfileDeleteManyArgs>(args?: SelectSubset<T, HoroscopeProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HoroscopeProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoroscopeProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HoroscopeProfiles
     * const horoscopeProfile = await prisma.horoscopeProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HoroscopeProfileUpdateManyArgs>(args: SelectSubset<T, HoroscopeProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one HoroscopeProfile.
     * @param {HoroscopeProfileUpsertArgs} args - Arguments to update or create a HoroscopeProfile.
     * @example
     * // Update or create a HoroscopeProfile
     * const horoscopeProfile = await prisma.horoscopeProfile.upsert({
     *   create: {
     *     // ... data to create a HoroscopeProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HoroscopeProfile we want to update
     *   }
     * })
     */
    upsert<T extends HoroscopeProfileUpsertArgs>(args: SelectSubset<T, HoroscopeProfileUpsertArgs<ExtArgs>>): Prisma__HoroscopeProfileClient<$Result.GetResult<Prisma.$HoroscopeProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of HoroscopeProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoroscopeProfileCountArgs} args - Arguments to filter HoroscopeProfiles to count.
     * @example
     * // Count the number of HoroscopeProfiles
     * const count = await prisma.horoscopeProfile.count({
     *   where: {
     *     // ... the filter for the HoroscopeProfiles we want to count
     *   }
     * })
    **/
    count<T extends HoroscopeProfileCountArgs>(
      args?: Subset<T, HoroscopeProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HoroscopeProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HoroscopeProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoroscopeProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HoroscopeProfileAggregateArgs>(args: Subset<T, HoroscopeProfileAggregateArgs>): Prisma.PrismaPromise<GetHoroscopeProfileAggregateType<T>>

    /**
     * Group by HoroscopeProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoroscopeProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HoroscopeProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HoroscopeProfileGroupByArgs['orderBy'] }
        : { orderBy?: HoroscopeProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HoroscopeProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHoroscopeProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HoroscopeProfile model
   */
  readonly fields: HoroscopeProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HoroscopeProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HoroscopeProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the HoroscopeProfile model
   */
  interface HoroscopeProfileFieldRefs {
    readonly id: FieldRef<"HoroscopeProfile", 'Int'>
    readonly userId: FieldRef<"HoroscopeProfile", 'Int'>
    readonly zodiacSign: FieldRef<"HoroscopeProfile", 'String'>
    readonly tamilYear: FieldRef<"HoroscopeProfile", 'String'>
    readonly tamilMonth: FieldRef<"HoroscopeProfile", 'String'>
    readonly udayathiNatchat: FieldRef<"HoroscopeProfile", 'String'>
    readonly day: FieldRef<"HoroscopeProfile", 'String'>
    readonly birthTime: FieldRef<"HoroscopeProfile", 'String'>
    readonly starFoot: FieldRef<"HoroscopeProfile", 'String'>
    readonly ascendant: FieldRef<"HoroscopeProfile", 'String'>
    readonly birthplace: FieldRef<"HoroscopeProfile", 'String'>
    readonly natalDirection: FieldRef<"HoroscopeProfile", 'String'>
    readonly horoscopeDocuments: FieldRef<"HoroscopeProfile", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * HoroscopeProfile findUnique
   */
  export type HoroscopeProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoroscopeProfile
     */
    select?: HoroscopeProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HoroscopeProfile
     */
    omit?: HoroscopeProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoroscopeProfileInclude<ExtArgs> | null
    /**
     * Filter, which HoroscopeProfile to fetch.
     */
    where: HoroscopeProfileWhereUniqueInput
  }

  /**
   * HoroscopeProfile findUniqueOrThrow
   */
  export type HoroscopeProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoroscopeProfile
     */
    select?: HoroscopeProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HoroscopeProfile
     */
    omit?: HoroscopeProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoroscopeProfileInclude<ExtArgs> | null
    /**
     * Filter, which HoroscopeProfile to fetch.
     */
    where: HoroscopeProfileWhereUniqueInput
  }

  /**
   * HoroscopeProfile findFirst
   */
  export type HoroscopeProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoroscopeProfile
     */
    select?: HoroscopeProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HoroscopeProfile
     */
    omit?: HoroscopeProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoroscopeProfileInclude<ExtArgs> | null
    /**
     * Filter, which HoroscopeProfile to fetch.
     */
    where?: HoroscopeProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HoroscopeProfiles to fetch.
     */
    orderBy?: HoroscopeProfileOrderByWithRelationInput | HoroscopeProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HoroscopeProfiles.
     */
    cursor?: HoroscopeProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HoroscopeProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HoroscopeProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HoroscopeProfiles.
     */
    distinct?: HoroscopeProfileScalarFieldEnum | HoroscopeProfileScalarFieldEnum[]
  }

  /**
   * HoroscopeProfile findFirstOrThrow
   */
  export type HoroscopeProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoroscopeProfile
     */
    select?: HoroscopeProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HoroscopeProfile
     */
    omit?: HoroscopeProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoroscopeProfileInclude<ExtArgs> | null
    /**
     * Filter, which HoroscopeProfile to fetch.
     */
    where?: HoroscopeProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HoroscopeProfiles to fetch.
     */
    orderBy?: HoroscopeProfileOrderByWithRelationInput | HoroscopeProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HoroscopeProfiles.
     */
    cursor?: HoroscopeProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HoroscopeProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HoroscopeProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HoroscopeProfiles.
     */
    distinct?: HoroscopeProfileScalarFieldEnum | HoroscopeProfileScalarFieldEnum[]
  }

  /**
   * HoroscopeProfile findMany
   */
  export type HoroscopeProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoroscopeProfile
     */
    select?: HoroscopeProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HoroscopeProfile
     */
    omit?: HoroscopeProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoroscopeProfileInclude<ExtArgs> | null
    /**
     * Filter, which HoroscopeProfiles to fetch.
     */
    where?: HoroscopeProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HoroscopeProfiles to fetch.
     */
    orderBy?: HoroscopeProfileOrderByWithRelationInput | HoroscopeProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HoroscopeProfiles.
     */
    cursor?: HoroscopeProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HoroscopeProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HoroscopeProfiles.
     */
    skip?: number
    distinct?: HoroscopeProfileScalarFieldEnum | HoroscopeProfileScalarFieldEnum[]
  }

  /**
   * HoroscopeProfile create
   */
  export type HoroscopeProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoroscopeProfile
     */
    select?: HoroscopeProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HoroscopeProfile
     */
    omit?: HoroscopeProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoroscopeProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a HoroscopeProfile.
     */
    data: XOR<HoroscopeProfileCreateInput, HoroscopeProfileUncheckedCreateInput>
  }

  /**
   * HoroscopeProfile createMany
   */
  export type HoroscopeProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HoroscopeProfiles.
     */
    data: HoroscopeProfileCreateManyInput | HoroscopeProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HoroscopeProfile update
   */
  export type HoroscopeProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoroscopeProfile
     */
    select?: HoroscopeProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HoroscopeProfile
     */
    omit?: HoroscopeProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoroscopeProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a HoroscopeProfile.
     */
    data: XOR<HoroscopeProfileUpdateInput, HoroscopeProfileUncheckedUpdateInput>
    /**
     * Choose, which HoroscopeProfile to update.
     */
    where: HoroscopeProfileWhereUniqueInput
  }

  /**
   * HoroscopeProfile updateMany
   */
  export type HoroscopeProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HoroscopeProfiles.
     */
    data: XOR<HoroscopeProfileUpdateManyMutationInput, HoroscopeProfileUncheckedUpdateManyInput>
    /**
     * Filter which HoroscopeProfiles to update
     */
    where?: HoroscopeProfileWhereInput
    /**
     * Limit how many HoroscopeProfiles to update.
     */
    limit?: number
  }

  /**
   * HoroscopeProfile upsert
   */
  export type HoroscopeProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoroscopeProfile
     */
    select?: HoroscopeProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HoroscopeProfile
     */
    omit?: HoroscopeProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoroscopeProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the HoroscopeProfile to update in case it exists.
     */
    where: HoroscopeProfileWhereUniqueInput
    /**
     * In case the HoroscopeProfile found by the `where` argument doesn't exist, create a new HoroscopeProfile with this data.
     */
    create: XOR<HoroscopeProfileCreateInput, HoroscopeProfileUncheckedCreateInput>
    /**
     * In case the HoroscopeProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HoroscopeProfileUpdateInput, HoroscopeProfileUncheckedUpdateInput>
  }

  /**
   * HoroscopeProfile delete
   */
  export type HoroscopeProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoroscopeProfile
     */
    select?: HoroscopeProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HoroscopeProfile
     */
    omit?: HoroscopeProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoroscopeProfileInclude<ExtArgs> | null
    /**
     * Filter which HoroscopeProfile to delete.
     */
    where: HoroscopeProfileWhereUniqueInput
  }

  /**
   * HoroscopeProfile deleteMany
   */
  export type HoroscopeProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HoroscopeProfiles to delete
     */
    where?: HoroscopeProfileWhereInput
    /**
     * Limit how many HoroscopeProfiles to delete.
     */
    limit?: number
  }

  /**
   * HoroscopeProfile without action
   */
  export type HoroscopeProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HoroscopeProfile
     */
    select?: HoroscopeProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HoroscopeProfile
     */
    omit?: HoroscopeProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoroscopeProfileInclude<ExtArgs> | null
  }


  /**
   * Model ProfileView
   */

  export type AggregateProfileView = {
    _count: ProfileViewCountAggregateOutputType | null
    _avg: ProfileViewAvgAggregateOutputType | null
    _sum: ProfileViewSumAggregateOutputType | null
    _min: ProfileViewMinAggregateOutputType | null
    _max: ProfileViewMaxAggregateOutputType | null
  }

  export type ProfileViewAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    profileId: number | null
  }

  export type ProfileViewSumAggregateOutputType = {
    id: number | null
    userId: number | null
    profileId: number | null
  }

  export type ProfileViewMinAggregateOutputType = {
    id: number | null
    userId: number | null
    profileId: number | null
    viewedAt: Date | null
  }

  export type ProfileViewMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    profileId: number | null
    viewedAt: Date | null
  }

  export type ProfileViewCountAggregateOutputType = {
    id: number
    userId: number
    profileId: number
    viewedAt: number
    _all: number
  }


  export type ProfileViewAvgAggregateInputType = {
    id?: true
    userId?: true
    profileId?: true
  }

  export type ProfileViewSumAggregateInputType = {
    id?: true
    userId?: true
    profileId?: true
  }

  export type ProfileViewMinAggregateInputType = {
    id?: true
    userId?: true
    profileId?: true
    viewedAt?: true
  }

  export type ProfileViewMaxAggregateInputType = {
    id?: true
    userId?: true
    profileId?: true
    viewedAt?: true
  }

  export type ProfileViewCountAggregateInputType = {
    id?: true
    userId?: true
    profileId?: true
    viewedAt?: true
    _all?: true
  }

  export type ProfileViewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProfileView to aggregate.
     */
    where?: ProfileViewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfileViews to fetch.
     */
    orderBy?: ProfileViewOrderByWithRelationInput | ProfileViewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfileViewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfileViews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfileViews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProfileViews
    **/
    _count?: true | ProfileViewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProfileViewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProfileViewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfileViewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfileViewMaxAggregateInputType
  }

  export type GetProfileViewAggregateType<T extends ProfileViewAggregateArgs> = {
        [P in keyof T & keyof AggregateProfileView]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfileView[P]>
      : GetScalarType<T[P], AggregateProfileView[P]>
  }




  export type ProfileViewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfileViewWhereInput
    orderBy?: ProfileViewOrderByWithAggregationInput | ProfileViewOrderByWithAggregationInput[]
    by: ProfileViewScalarFieldEnum[] | ProfileViewScalarFieldEnum
    having?: ProfileViewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfileViewCountAggregateInputType | true
    _avg?: ProfileViewAvgAggregateInputType
    _sum?: ProfileViewSumAggregateInputType
    _min?: ProfileViewMinAggregateInputType
    _max?: ProfileViewMaxAggregateInputType
  }

  export type ProfileViewGroupByOutputType = {
    id: number
    userId: number
    profileId: number
    viewedAt: Date
    _count: ProfileViewCountAggregateOutputType | null
    _avg: ProfileViewAvgAggregateOutputType | null
    _sum: ProfileViewSumAggregateOutputType | null
    _min: ProfileViewMinAggregateOutputType | null
    _max: ProfileViewMaxAggregateOutputType | null
  }

  type GetProfileViewGroupByPayload<T extends ProfileViewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfileViewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfileViewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfileViewGroupByOutputType[P]>
            : GetScalarType<T[P], ProfileViewGroupByOutputType[P]>
        }
      >
    >


  export type ProfileViewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    profileId?: boolean
    viewedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profileView"]>



  export type ProfileViewSelectScalar = {
    id?: boolean
    userId?: boolean
    profileId?: boolean
    viewedAt?: boolean
  }

  export type ProfileViewOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "profileId" | "viewedAt", ExtArgs["result"]["profileView"]>
  export type ProfileViewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProfileViewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProfileView"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      profileId: number
      viewedAt: Date
    }, ExtArgs["result"]["profileView"]>
    composites: {}
  }

  type ProfileViewGetPayload<S extends boolean | null | undefined | ProfileViewDefaultArgs> = $Result.GetResult<Prisma.$ProfileViewPayload, S>

  type ProfileViewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfileViewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfileViewCountAggregateInputType | true
    }

  export interface ProfileViewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProfileView'], meta: { name: 'ProfileView' } }
    /**
     * Find zero or one ProfileView that matches the filter.
     * @param {ProfileViewFindUniqueArgs} args - Arguments to find a ProfileView
     * @example
     * // Get one ProfileView
     * const profileView = await prisma.profileView.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfileViewFindUniqueArgs>(args: SelectSubset<T, ProfileViewFindUniqueArgs<ExtArgs>>): Prisma__ProfileViewClient<$Result.GetResult<Prisma.$ProfileViewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProfileView that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfileViewFindUniqueOrThrowArgs} args - Arguments to find a ProfileView
     * @example
     * // Get one ProfileView
     * const profileView = await prisma.profileView.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfileViewFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfileViewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfileViewClient<$Result.GetResult<Prisma.$ProfileViewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProfileView that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileViewFindFirstArgs} args - Arguments to find a ProfileView
     * @example
     * // Get one ProfileView
     * const profileView = await prisma.profileView.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfileViewFindFirstArgs>(args?: SelectSubset<T, ProfileViewFindFirstArgs<ExtArgs>>): Prisma__ProfileViewClient<$Result.GetResult<Prisma.$ProfileViewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProfileView that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileViewFindFirstOrThrowArgs} args - Arguments to find a ProfileView
     * @example
     * // Get one ProfileView
     * const profileView = await prisma.profileView.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfileViewFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfileViewFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfileViewClient<$Result.GetResult<Prisma.$ProfileViewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProfileViews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileViewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProfileViews
     * const profileViews = await prisma.profileView.findMany()
     * 
     * // Get first 10 ProfileViews
     * const profileViews = await prisma.profileView.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const profileViewWithIdOnly = await prisma.profileView.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfileViewFindManyArgs>(args?: SelectSubset<T, ProfileViewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfileViewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProfileView.
     * @param {ProfileViewCreateArgs} args - Arguments to create a ProfileView.
     * @example
     * // Create one ProfileView
     * const ProfileView = await prisma.profileView.create({
     *   data: {
     *     // ... data to create a ProfileView
     *   }
     * })
     * 
     */
    create<T extends ProfileViewCreateArgs>(args: SelectSubset<T, ProfileViewCreateArgs<ExtArgs>>): Prisma__ProfileViewClient<$Result.GetResult<Prisma.$ProfileViewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProfileViews.
     * @param {ProfileViewCreateManyArgs} args - Arguments to create many ProfileViews.
     * @example
     * // Create many ProfileViews
     * const profileView = await prisma.profileView.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfileViewCreateManyArgs>(args?: SelectSubset<T, ProfileViewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ProfileView.
     * @param {ProfileViewDeleteArgs} args - Arguments to delete one ProfileView.
     * @example
     * // Delete one ProfileView
     * const ProfileView = await prisma.profileView.delete({
     *   where: {
     *     // ... filter to delete one ProfileView
     *   }
     * })
     * 
     */
    delete<T extends ProfileViewDeleteArgs>(args: SelectSubset<T, ProfileViewDeleteArgs<ExtArgs>>): Prisma__ProfileViewClient<$Result.GetResult<Prisma.$ProfileViewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProfileView.
     * @param {ProfileViewUpdateArgs} args - Arguments to update one ProfileView.
     * @example
     * // Update one ProfileView
     * const profileView = await prisma.profileView.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfileViewUpdateArgs>(args: SelectSubset<T, ProfileViewUpdateArgs<ExtArgs>>): Prisma__ProfileViewClient<$Result.GetResult<Prisma.$ProfileViewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProfileViews.
     * @param {ProfileViewDeleteManyArgs} args - Arguments to filter ProfileViews to delete.
     * @example
     * // Delete a few ProfileViews
     * const { count } = await prisma.profileView.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfileViewDeleteManyArgs>(args?: SelectSubset<T, ProfileViewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProfileViews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileViewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProfileViews
     * const profileView = await prisma.profileView.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfileViewUpdateManyArgs>(args: SelectSubset<T, ProfileViewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProfileView.
     * @param {ProfileViewUpsertArgs} args - Arguments to update or create a ProfileView.
     * @example
     * // Update or create a ProfileView
     * const profileView = await prisma.profileView.upsert({
     *   create: {
     *     // ... data to create a ProfileView
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProfileView we want to update
     *   }
     * })
     */
    upsert<T extends ProfileViewUpsertArgs>(args: SelectSubset<T, ProfileViewUpsertArgs<ExtArgs>>): Prisma__ProfileViewClient<$Result.GetResult<Prisma.$ProfileViewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProfileViews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileViewCountArgs} args - Arguments to filter ProfileViews to count.
     * @example
     * // Count the number of ProfileViews
     * const count = await prisma.profileView.count({
     *   where: {
     *     // ... the filter for the ProfileViews we want to count
     *   }
     * })
    **/
    count<T extends ProfileViewCountArgs>(
      args?: Subset<T, ProfileViewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfileViewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProfileView.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileViewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfileViewAggregateArgs>(args: Subset<T, ProfileViewAggregateArgs>): Prisma.PrismaPromise<GetProfileViewAggregateType<T>>

    /**
     * Group by ProfileView.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileViewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfileViewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfileViewGroupByArgs['orderBy'] }
        : { orderBy?: ProfileViewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfileViewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfileViewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProfileView model
   */
  readonly fields: ProfileViewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProfileView.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfileViewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProfileView model
   */
  interface ProfileViewFieldRefs {
    readonly id: FieldRef<"ProfileView", 'Int'>
    readonly userId: FieldRef<"ProfileView", 'Int'>
    readonly profileId: FieldRef<"ProfileView", 'Int'>
    readonly viewedAt: FieldRef<"ProfileView", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProfileView findUnique
   */
  export type ProfileViewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileView
     */
    select?: ProfileViewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileView
     */
    omit?: ProfileViewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileViewInclude<ExtArgs> | null
    /**
     * Filter, which ProfileView to fetch.
     */
    where: ProfileViewWhereUniqueInput
  }

  /**
   * ProfileView findUniqueOrThrow
   */
  export type ProfileViewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileView
     */
    select?: ProfileViewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileView
     */
    omit?: ProfileViewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileViewInclude<ExtArgs> | null
    /**
     * Filter, which ProfileView to fetch.
     */
    where: ProfileViewWhereUniqueInput
  }

  /**
   * ProfileView findFirst
   */
  export type ProfileViewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileView
     */
    select?: ProfileViewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileView
     */
    omit?: ProfileViewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileViewInclude<ExtArgs> | null
    /**
     * Filter, which ProfileView to fetch.
     */
    where?: ProfileViewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfileViews to fetch.
     */
    orderBy?: ProfileViewOrderByWithRelationInput | ProfileViewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProfileViews.
     */
    cursor?: ProfileViewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfileViews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfileViews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProfileViews.
     */
    distinct?: ProfileViewScalarFieldEnum | ProfileViewScalarFieldEnum[]
  }

  /**
   * ProfileView findFirstOrThrow
   */
  export type ProfileViewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileView
     */
    select?: ProfileViewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileView
     */
    omit?: ProfileViewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileViewInclude<ExtArgs> | null
    /**
     * Filter, which ProfileView to fetch.
     */
    where?: ProfileViewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfileViews to fetch.
     */
    orderBy?: ProfileViewOrderByWithRelationInput | ProfileViewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProfileViews.
     */
    cursor?: ProfileViewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfileViews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfileViews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProfileViews.
     */
    distinct?: ProfileViewScalarFieldEnum | ProfileViewScalarFieldEnum[]
  }

  /**
   * ProfileView findMany
   */
  export type ProfileViewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileView
     */
    select?: ProfileViewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileView
     */
    omit?: ProfileViewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileViewInclude<ExtArgs> | null
    /**
     * Filter, which ProfileViews to fetch.
     */
    where?: ProfileViewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfileViews to fetch.
     */
    orderBy?: ProfileViewOrderByWithRelationInput | ProfileViewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProfileViews.
     */
    cursor?: ProfileViewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfileViews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfileViews.
     */
    skip?: number
    distinct?: ProfileViewScalarFieldEnum | ProfileViewScalarFieldEnum[]
  }

  /**
   * ProfileView create
   */
  export type ProfileViewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileView
     */
    select?: ProfileViewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileView
     */
    omit?: ProfileViewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileViewInclude<ExtArgs> | null
    /**
     * The data needed to create a ProfileView.
     */
    data: XOR<ProfileViewCreateInput, ProfileViewUncheckedCreateInput>
  }

  /**
   * ProfileView createMany
   */
  export type ProfileViewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProfileViews.
     */
    data: ProfileViewCreateManyInput | ProfileViewCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProfileView update
   */
  export type ProfileViewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileView
     */
    select?: ProfileViewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileView
     */
    omit?: ProfileViewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileViewInclude<ExtArgs> | null
    /**
     * The data needed to update a ProfileView.
     */
    data: XOR<ProfileViewUpdateInput, ProfileViewUncheckedUpdateInput>
    /**
     * Choose, which ProfileView to update.
     */
    where: ProfileViewWhereUniqueInput
  }

  /**
   * ProfileView updateMany
   */
  export type ProfileViewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProfileViews.
     */
    data: XOR<ProfileViewUpdateManyMutationInput, ProfileViewUncheckedUpdateManyInput>
    /**
     * Filter which ProfileViews to update
     */
    where?: ProfileViewWhereInput
    /**
     * Limit how many ProfileViews to update.
     */
    limit?: number
  }

  /**
   * ProfileView upsert
   */
  export type ProfileViewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileView
     */
    select?: ProfileViewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileView
     */
    omit?: ProfileViewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileViewInclude<ExtArgs> | null
    /**
     * The filter to search for the ProfileView to update in case it exists.
     */
    where: ProfileViewWhereUniqueInput
    /**
     * In case the ProfileView found by the `where` argument doesn't exist, create a new ProfileView with this data.
     */
    create: XOR<ProfileViewCreateInput, ProfileViewUncheckedCreateInput>
    /**
     * In case the ProfileView was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfileViewUpdateInput, ProfileViewUncheckedUpdateInput>
  }

  /**
   * ProfileView delete
   */
  export type ProfileViewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileView
     */
    select?: ProfileViewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileView
     */
    omit?: ProfileViewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileViewInclude<ExtArgs> | null
    /**
     * Filter which ProfileView to delete.
     */
    where: ProfileViewWhereUniqueInput
  }

  /**
   * ProfileView deleteMany
   */
  export type ProfileViewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProfileViews to delete
     */
    where?: ProfileViewWhereInput
    /**
     * Limit how many ProfileViews to delete.
     */
    limit?: number
  }

  /**
   * ProfileView without action
   */
  export type ProfileViewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileView
     */
    select?: ProfileViewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileView
     */
    omit?: ProfileViewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileViewInclude<ExtArgs> | null
  }


  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  export type PaymentAvgAggregateOutputType = {
    id: number | null
    transactionAmount: number | null
  }

  export type PaymentSumAggregateOutputType = {
    id: number | null
    transactionAmount: number | null
  }

  export type PaymentMinAggregateOutputType = {
    id: number | null
    customerName: string | null
    transactionAmount: number | null
    transactionDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentMaxAggregateOutputType = {
    id: number | null
    customerName: string | null
    transactionAmount: number | null
    transactionDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentCountAggregateOutputType = {
    id: number
    customerName: number
    transactionAmount: number
    transactionDate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    id?: true
    transactionAmount?: true
  }

  export type PaymentSumAggregateInputType = {
    id?: true
    transactionAmount?: true
  }

  export type PaymentMinAggregateInputType = {
    id?: true
    customerName?: true
    transactionAmount?: true
    transactionDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentMaxAggregateInputType = {
    id?: true
    customerName?: true
    transactionAmount?: true
    transactionDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentCountAggregateInputType = {
    id?: true
    customerName?: true
    transactionAmount?: true
    transactionDate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMaxAggregateInputType
  }

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>
  }




  export type PaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[]
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum
    having?: PaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentCountAggregateInputType | true
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
  }

  export type PaymentGroupByOutputType = {
    id: number
    customerName: string
    transactionAmount: number
    transactionDate: Date
    createdAt: Date
    updatedAt: Date
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerName?: boolean
    transactionAmount?: boolean
    transactionDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["payment"]>



  export type PaymentSelectScalar = {
    id?: boolean
    customerName?: boolean
    transactionAmount?: boolean
    transactionDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "customerName" | "transactionAmount" | "transactionDate" | "createdAt" | "updatedAt", ExtArgs["result"]["payment"]>

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      customerName: string
      transactionAmount: number
      transactionDate: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["payment"]>
    composites: {}
  }

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = $Result.GetResult<Prisma.$PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentFindManyArgs>(args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     * 
     */
    create<T extends PaymentCreateArgs>(args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentCreateManyArgs>(args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     * 
     */
    delete<T extends PaymentDeleteArgs>(args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentUpdateArgs>(args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentDeleteManyArgs>(args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentUpdateManyArgs>(args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payment model
   */
  readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Payment model
   */
  interface PaymentFieldRefs {
    readonly id: FieldRef<"Payment", 'Int'>
    readonly customerName: FieldRef<"Payment", 'String'>
    readonly transactionAmount: FieldRef<"Payment", 'Float'>
    readonly transactionDate: FieldRef<"Payment", 'DateTime'>
    readonly createdAt: FieldRef<"Payment", 'DateTime'>
    readonly updatedAt: FieldRef<"Payment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
  }

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
  }

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
  }

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to delete.
     */
    limit?: number
  }

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    firstName: 'firstName',
    lastName: 'lastName',
    isActive: 'isActive',
    credits: 'credits',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    firstName: 'firstName',
    lastName: 'lastName',
    age: 'age',
    regNo: 'regNo',
    liked: 'liked',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProfileScalarFieldEnum = (typeof ProfileScalarFieldEnum)[keyof typeof ProfileScalarFieldEnum]


  export const UserProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    dietType: 'dietType',
    dob: 'dob',
    age: 'age',
    height: 'height',
    color: 'color',
    education: 'education',
    career: 'career',
    salary: 'salary',
    familyProperty: 'familyProperty',
    expectation: 'expectation',
    phone: 'phone',
    caste: 'caste',
    marriageStatus: 'marriageStatus',
    profilePhotos: 'profilePhotos',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserProfileScalarFieldEnum = (typeof UserProfileScalarFieldEnum)[keyof typeof UserProfileScalarFieldEnum]


  export const ParentInfoScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    fatherName: 'fatherName',
    motherName: 'motherName',
    fatherNative: 'fatherNative',
    motherNative: 'motherNative',
    fatherProfession: 'fatherProfession',
    motherProfession: 'motherProfession',
    phone: 'phone',
    address: 'address',
    brothers: 'brothers',
    elderBrothers: 'elderBrothers',
    youngerBrothers: 'youngerBrothers',
    marriedBrothers: 'marriedBrothers',
    sisters: 'sisters',
    elderSisters: 'elderSisters',
    youngerSisters: 'youngerSisters',
    marriedSisters: 'marriedSisters'
  };

  export type ParentInfoScalarFieldEnum = (typeof ParentInfoScalarFieldEnum)[keyof typeof ParentInfoScalarFieldEnum]


  export const HoroscopeProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    zodiacSign: 'zodiacSign',
    tamilYear: 'tamilYear',
    tamilMonth: 'tamilMonth',
    udayathiNatchat: 'udayathiNatchat',
    day: 'day',
    birthTime: 'birthTime',
    starFoot: 'starFoot',
    ascendant: 'ascendant',
    birthplace: 'birthplace',
    natalDirection: 'natalDirection',
    horoscopeDocuments: 'horoscopeDocuments'
  };

  export type HoroscopeProfileScalarFieldEnum = (typeof HoroscopeProfileScalarFieldEnum)[keyof typeof HoroscopeProfileScalarFieldEnum]


  export const ProfileViewScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    profileId: 'profileId',
    viewedAt: 'viewedAt'
  };

  export type ProfileViewScalarFieldEnum = (typeof ProfileViewScalarFieldEnum)[keyof typeof ProfileViewScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
    id: 'id',
    customerName: 'customerName',
    transactionAmount: 'transactionAmount',
    transactionDate: 'transactionDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const UserOrderByRelevanceFieldEnum: {
    email: 'email',
    password: 'password',
    firstName: 'firstName',
    lastName: 'lastName'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const ProfileOrderByRelevanceFieldEnum: {
    firstName: 'firstName',
    lastName: 'lastName',
    regNo: 'regNo'
  };

  export type ProfileOrderByRelevanceFieldEnum = (typeof ProfileOrderByRelevanceFieldEnum)[keyof typeof ProfileOrderByRelevanceFieldEnum]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const UserProfileOrderByRelevanceFieldEnum: {
    type: 'type',
    dietType: 'dietType',
    height: 'height',
    color: 'color',
    education: 'education',
    career: 'career',
    salary: 'salary',
    familyProperty: 'familyProperty',
    expectation: 'expectation',
    phone: 'phone',
    caste: 'caste',
    marriageStatus: 'marriageStatus'
  };

  export type UserProfileOrderByRelevanceFieldEnum = (typeof UserProfileOrderByRelevanceFieldEnum)[keyof typeof UserProfileOrderByRelevanceFieldEnum]


  export const ParentInfoOrderByRelevanceFieldEnum: {
    fatherName: 'fatherName',
    motherName: 'motherName',
    fatherNative: 'fatherNative',
    motherNative: 'motherNative',
    fatherProfession: 'fatherProfession',
    motherProfession: 'motherProfession',
    phone: 'phone',
    address: 'address'
  };

  export type ParentInfoOrderByRelevanceFieldEnum = (typeof ParentInfoOrderByRelevanceFieldEnum)[keyof typeof ParentInfoOrderByRelevanceFieldEnum]


  export const HoroscopeProfileOrderByRelevanceFieldEnum: {
    zodiacSign: 'zodiacSign',
    tamilYear: 'tamilYear',
    tamilMonth: 'tamilMonth',
    udayathiNatchat: 'udayathiNatchat',
    day: 'day',
    birthTime: 'birthTime',
    starFoot: 'starFoot',
    ascendant: 'ascendant',
    birthplace: 'birthplace',
    natalDirection: 'natalDirection'
  };

  export type HoroscopeProfileOrderByRelevanceFieldEnum = (typeof HoroscopeProfileOrderByRelevanceFieldEnum)[keyof typeof HoroscopeProfileOrderByRelevanceFieldEnum]


  export const PaymentOrderByRelevanceFieldEnum: {
    customerName: 'customerName'
  };

  export type PaymentOrderByRelevanceFieldEnum = (typeof PaymentOrderByRelevanceFieldEnum)[keyof typeof PaymentOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    isActive?: BoolFilter<"User"> | boolean
    credits?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    profile?: XOR<ProfileNullableScalarRelationFilter, ProfileWhereInput> | null
    profileViews?: ProfileViewListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    isActive?: SortOrder
    credits?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    profile?: ProfileOrderByWithRelationInput
    profileViews?: ProfileViewOrderByRelationAggregateInput
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    isActive?: BoolFilter<"User"> | boolean
    credits?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    profile?: XOR<ProfileNullableScalarRelationFilter, ProfileWhereInput> | null
    profileViews?: ProfileViewListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    isActive?: SortOrder
    credits?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    firstName?: StringWithAggregatesFilter<"User"> | string
    lastName?: StringWithAggregatesFilter<"User"> | string
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    credits?: IntWithAggregatesFilter<"User"> | number
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ProfileWhereInput = {
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    id?: IntFilter<"Profile"> | number
    userId?: IntFilter<"Profile"> | number
    firstName?: StringFilter<"Profile"> | string
    lastName?: StringFilter<"Profile"> | string
    age?: IntNullableFilter<"Profile"> | number | null
    regNo?: StringFilter<"Profile"> | string
    liked?: BoolNullableFilter<"Profile"> | boolean | null
    createdAt?: DateTimeFilter<"Profile"> | Date | string
    updatedAt?: DateTimeFilter<"Profile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    userProfile?: XOR<UserProfileNullableScalarRelationFilter, UserProfileWhereInput> | null
    parentInfo?: XOR<ParentInfoNullableScalarRelationFilter, ParentInfoWhereInput> | null
    horoscopeProfile?: XOR<HoroscopeProfileNullableScalarRelationFilter, HoroscopeProfileWhereInput> | null
  }

  export type ProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    age?: SortOrderInput | SortOrder
    regNo?: SortOrder
    liked?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    userProfile?: UserProfileOrderByWithRelationInput
    parentInfo?: ParentInfoOrderByWithRelationInput
    horoscopeProfile?: HoroscopeProfileOrderByWithRelationInput
    _relevance?: ProfileOrderByRelevanceInput
  }

  export type ProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId?: number
    regNo?: string
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    firstName?: StringFilter<"Profile"> | string
    lastName?: StringFilter<"Profile"> | string
    age?: IntNullableFilter<"Profile"> | number | null
    liked?: BoolNullableFilter<"Profile"> | boolean | null
    createdAt?: DateTimeFilter<"Profile"> | Date | string
    updatedAt?: DateTimeFilter<"Profile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    userProfile?: XOR<UserProfileNullableScalarRelationFilter, UserProfileWhereInput> | null
    parentInfo?: XOR<ParentInfoNullableScalarRelationFilter, ParentInfoWhereInput> | null
    horoscopeProfile?: XOR<HoroscopeProfileNullableScalarRelationFilter, HoroscopeProfileWhereInput> | null
  }, "id" | "userId" | "regNo">

  export type ProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    age?: SortOrderInput | SortOrder
    regNo?: SortOrder
    liked?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProfileCountOrderByAggregateInput
    _avg?: ProfileAvgOrderByAggregateInput
    _max?: ProfileMaxOrderByAggregateInput
    _min?: ProfileMinOrderByAggregateInput
    _sum?: ProfileSumOrderByAggregateInput
  }

  export type ProfileScalarWhereWithAggregatesInput = {
    AND?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    OR?: ProfileScalarWhereWithAggregatesInput[]
    NOT?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Profile"> | number
    userId?: IntWithAggregatesFilter<"Profile"> | number
    firstName?: StringWithAggregatesFilter<"Profile"> | string
    lastName?: StringWithAggregatesFilter<"Profile"> | string
    age?: IntNullableWithAggregatesFilter<"Profile"> | number | null
    regNo?: StringWithAggregatesFilter<"Profile"> | string
    liked?: BoolNullableWithAggregatesFilter<"Profile"> | boolean | null
    createdAt?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
  }

  export type UserProfileWhereInput = {
    AND?: UserProfileWhereInput | UserProfileWhereInput[]
    OR?: UserProfileWhereInput[]
    NOT?: UserProfileWhereInput | UserProfileWhereInput[]
    id?: IntFilter<"UserProfile"> | number
    userId?: IntFilter<"UserProfile"> | number
    type?: StringFilter<"UserProfile"> | string
    dietType?: StringFilter<"UserProfile"> | string
    dob?: DateTimeFilter<"UserProfile"> | Date | string
    age?: IntFilter<"UserProfile"> | number
    height?: StringFilter<"UserProfile"> | string
    color?: StringFilter<"UserProfile"> | string
    education?: StringFilter<"UserProfile"> | string
    career?: StringFilter<"UserProfile"> | string
    salary?: StringFilter<"UserProfile"> | string
    familyProperty?: StringFilter<"UserProfile"> | string
    expectation?: StringFilter<"UserProfile"> | string
    phone?: StringFilter<"UserProfile"> | string
    caste?: StringFilter<"UserProfile"> | string
    marriageStatus?: StringFilter<"UserProfile"> | string
    profilePhotos?: JsonFilter<"UserProfile">
    createdAt?: DateTimeFilter<"UserProfile"> | Date | string
    updatedAt?: DateTimeFilter<"UserProfile"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
  }

  export type UserProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    dietType?: SortOrder
    dob?: SortOrder
    age?: SortOrder
    height?: SortOrder
    color?: SortOrder
    education?: SortOrder
    career?: SortOrder
    salary?: SortOrder
    familyProperty?: SortOrder
    expectation?: SortOrder
    phone?: SortOrder
    caste?: SortOrder
    marriageStatus?: SortOrder
    profilePhotos?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    profile?: ProfileOrderByWithRelationInput
    _relevance?: UserProfileOrderByRelevanceInput
  }

  export type UserProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId?: number
    AND?: UserProfileWhereInput | UserProfileWhereInput[]
    OR?: UserProfileWhereInput[]
    NOT?: UserProfileWhereInput | UserProfileWhereInput[]
    type?: StringFilter<"UserProfile"> | string
    dietType?: StringFilter<"UserProfile"> | string
    dob?: DateTimeFilter<"UserProfile"> | Date | string
    age?: IntFilter<"UserProfile"> | number
    height?: StringFilter<"UserProfile"> | string
    color?: StringFilter<"UserProfile"> | string
    education?: StringFilter<"UserProfile"> | string
    career?: StringFilter<"UserProfile"> | string
    salary?: StringFilter<"UserProfile"> | string
    familyProperty?: StringFilter<"UserProfile"> | string
    expectation?: StringFilter<"UserProfile"> | string
    phone?: StringFilter<"UserProfile"> | string
    caste?: StringFilter<"UserProfile"> | string
    marriageStatus?: StringFilter<"UserProfile"> | string
    profilePhotos?: JsonFilter<"UserProfile">
    createdAt?: DateTimeFilter<"UserProfile"> | Date | string
    updatedAt?: DateTimeFilter<"UserProfile"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
  }, "id" | "userId">

  export type UserProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    dietType?: SortOrder
    dob?: SortOrder
    age?: SortOrder
    height?: SortOrder
    color?: SortOrder
    education?: SortOrder
    career?: SortOrder
    salary?: SortOrder
    familyProperty?: SortOrder
    expectation?: SortOrder
    phone?: SortOrder
    caste?: SortOrder
    marriageStatus?: SortOrder
    profilePhotos?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserProfileCountOrderByAggregateInput
    _avg?: UserProfileAvgOrderByAggregateInput
    _max?: UserProfileMaxOrderByAggregateInput
    _min?: UserProfileMinOrderByAggregateInput
    _sum?: UserProfileSumOrderByAggregateInput
  }

  export type UserProfileScalarWhereWithAggregatesInput = {
    AND?: UserProfileScalarWhereWithAggregatesInput | UserProfileScalarWhereWithAggregatesInput[]
    OR?: UserProfileScalarWhereWithAggregatesInput[]
    NOT?: UserProfileScalarWhereWithAggregatesInput | UserProfileScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UserProfile"> | number
    userId?: IntWithAggregatesFilter<"UserProfile"> | number
    type?: StringWithAggregatesFilter<"UserProfile"> | string
    dietType?: StringWithAggregatesFilter<"UserProfile"> | string
    dob?: DateTimeWithAggregatesFilter<"UserProfile"> | Date | string
    age?: IntWithAggregatesFilter<"UserProfile"> | number
    height?: StringWithAggregatesFilter<"UserProfile"> | string
    color?: StringWithAggregatesFilter<"UserProfile"> | string
    education?: StringWithAggregatesFilter<"UserProfile"> | string
    career?: StringWithAggregatesFilter<"UserProfile"> | string
    salary?: StringWithAggregatesFilter<"UserProfile"> | string
    familyProperty?: StringWithAggregatesFilter<"UserProfile"> | string
    expectation?: StringWithAggregatesFilter<"UserProfile"> | string
    phone?: StringWithAggregatesFilter<"UserProfile"> | string
    caste?: StringWithAggregatesFilter<"UserProfile"> | string
    marriageStatus?: StringWithAggregatesFilter<"UserProfile"> | string
    profilePhotos?: JsonWithAggregatesFilter<"UserProfile">
    createdAt?: DateTimeWithAggregatesFilter<"UserProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserProfile"> | Date | string
  }

  export type ParentInfoWhereInput = {
    AND?: ParentInfoWhereInput | ParentInfoWhereInput[]
    OR?: ParentInfoWhereInput[]
    NOT?: ParentInfoWhereInput | ParentInfoWhereInput[]
    id?: IntFilter<"ParentInfo"> | number
    userId?: IntFilter<"ParentInfo"> | number
    fatherName?: StringFilter<"ParentInfo"> | string
    motherName?: StringFilter<"ParentInfo"> | string
    fatherNative?: StringFilter<"ParentInfo"> | string
    motherNative?: StringFilter<"ParentInfo"> | string
    fatherProfession?: StringFilter<"ParentInfo"> | string
    motherProfession?: StringFilter<"ParentInfo"> | string
    phone?: StringFilter<"ParentInfo"> | string
    address?: StringFilter<"ParentInfo"> | string
    brothers?: IntFilter<"ParentInfo"> | number
    elderBrothers?: IntFilter<"ParentInfo"> | number
    youngerBrothers?: IntFilter<"ParentInfo"> | number
    marriedBrothers?: IntFilter<"ParentInfo"> | number
    sisters?: IntFilter<"ParentInfo"> | number
    elderSisters?: IntFilter<"ParentInfo"> | number
    youngerSisters?: IntFilter<"ParentInfo"> | number
    marriedSisters?: IntFilter<"ParentInfo"> | number
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
  }

  export type ParentInfoOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    fatherName?: SortOrder
    motherName?: SortOrder
    fatherNative?: SortOrder
    motherNative?: SortOrder
    fatherProfession?: SortOrder
    motherProfession?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    brothers?: SortOrder
    elderBrothers?: SortOrder
    youngerBrothers?: SortOrder
    marriedBrothers?: SortOrder
    sisters?: SortOrder
    elderSisters?: SortOrder
    youngerSisters?: SortOrder
    marriedSisters?: SortOrder
    profile?: ProfileOrderByWithRelationInput
    _relevance?: ParentInfoOrderByRelevanceInput
  }

  export type ParentInfoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId?: number
    AND?: ParentInfoWhereInput | ParentInfoWhereInput[]
    OR?: ParentInfoWhereInput[]
    NOT?: ParentInfoWhereInput | ParentInfoWhereInput[]
    fatherName?: StringFilter<"ParentInfo"> | string
    motherName?: StringFilter<"ParentInfo"> | string
    fatherNative?: StringFilter<"ParentInfo"> | string
    motherNative?: StringFilter<"ParentInfo"> | string
    fatherProfession?: StringFilter<"ParentInfo"> | string
    motherProfession?: StringFilter<"ParentInfo"> | string
    phone?: StringFilter<"ParentInfo"> | string
    address?: StringFilter<"ParentInfo"> | string
    brothers?: IntFilter<"ParentInfo"> | number
    elderBrothers?: IntFilter<"ParentInfo"> | number
    youngerBrothers?: IntFilter<"ParentInfo"> | number
    marriedBrothers?: IntFilter<"ParentInfo"> | number
    sisters?: IntFilter<"ParentInfo"> | number
    elderSisters?: IntFilter<"ParentInfo"> | number
    youngerSisters?: IntFilter<"ParentInfo"> | number
    marriedSisters?: IntFilter<"ParentInfo"> | number
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
  }, "id" | "userId">

  export type ParentInfoOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    fatherName?: SortOrder
    motherName?: SortOrder
    fatherNative?: SortOrder
    motherNative?: SortOrder
    fatherProfession?: SortOrder
    motherProfession?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    brothers?: SortOrder
    elderBrothers?: SortOrder
    youngerBrothers?: SortOrder
    marriedBrothers?: SortOrder
    sisters?: SortOrder
    elderSisters?: SortOrder
    youngerSisters?: SortOrder
    marriedSisters?: SortOrder
    _count?: ParentInfoCountOrderByAggregateInput
    _avg?: ParentInfoAvgOrderByAggregateInput
    _max?: ParentInfoMaxOrderByAggregateInput
    _min?: ParentInfoMinOrderByAggregateInput
    _sum?: ParentInfoSumOrderByAggregateInput
  }

  export type ParentInfoScalarWhereWithAggregatesInput = {
    AND?: ParentInfoScalarWhereWithAggregatesInput | ParentInfoScalarWhereWithAggregatesInput[]
    OR?: ParentInfoScalarWhereWithAggregatesInput[]
    NOT?: ParentInfoScalarWhereWithAggregatesInput | ParentInfoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ParentInfo"> | number
    userId?: IntWithAggregatesFilter<"ParentInfo"> | number
    fatherName?: StringWithAggregatesFilter<"ParentInfo"> | string
    motherName?: StringWithAggregatesFilter<"ParentInfo"> | string
    fatherNative?: StringWithAggregatesFilter<"ParentInfo"> | string
    motherNative?: StringWithAggregatesFilter<"ParentInfo"> | string
    fatherProfession?: StringWithAggregatesFilter<"ParentInfo"> | string
    motherProfession?: StringWithAggregatesFilter<"ParentInfo"> | string
    phone?: StringWithAggregatesFilter<"ParentInfo"> | string
    address?: StringWithAggregatesFilter<"ParentInfo"> | string
    brothers?: IntWithAggregatesFilter<"ParentInfo"> | number
    elderBrothers?: IntWithAggregatesFilter<"ParentInfo"> | number
    youngerBrothers?: IntWithAggregatesFilter<"ParentInfo"> | number
    marriedBrothers?: IntWithAggregatesFilter<"ParentInfo"> | number
    sisters?: IntWithAggregatesFilter<"ParentInfo"> | number
    elderSisters?: IntWithAggregatesFilter<"ParentInfo"> | number
    youngerSisters?: IntWithAggregatesFilter<"ParentInfo"> | number
    marriedSisters?: IntWithAggregatesFilter<"ParentInfo"> | number
  }

  export type HoroscopeProfileWhereInput = {
    AND?: HoroscopeProfileWhereInput | HoroscopeProfileWhereInput[]
    OR?: HoroscopeProfileWhereInput[]
    NOT?: HoroscopeProfileWhereInput | HoroscopeProfileWhereInput[]
    id?: IntFilter<"HoroscopeProfile"> | number
    userId?: IntFilter<"HoroscopeProfile"> | number
    zodiacSign?: StringFilter<"HoroscopeProfile"> | string
    tamilYear?: StringFilter<"HoroscopeProfile"> | string
    tamilMonth?: StringFilter<"HoroscopeProfile"> | string
    udayathiNatchat?: StringFilter<"HoroscopeProfile"> | string
    day?: StringFilter<"HoroscopeProfile"> | string
    birthTime?: StringFilter<"HoroscopeProfile"> | string
    starFoot?: StringFilter<"HoroscopeProfile"> | string
    ascendant?: StringFilter<"HoroscopeProfile"> | string
    birthplace?: StringFilter<"HoroscopeProfile"> | string
    natalDirection?: StringFilter<"HoroscopeProfile"> | string
    horoscopeDocuments?: JsonNullableFilter<"HoroscopeProfile">
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
  }

  export type HoroscopeProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    zodiacSign?: SortOrder
    tamilYear?: SortOrder
    tamilMonth?: SortOrder
    udayathiNatchat?: SortOrder
    day?: SortOrder
    birthTime?: SortOrder
    starFoot?: SortOrder
    ascendant?: SortOrder
    birthplace?: SortOrder
    natalDirection?: SortOrder
    horoscopeDocuments?: SortOrderInput | SortOrder
    profile?: ProfileOrderByWithRelationInput
    _relevance?: HoroscopeProfileOrderByRelevanceInput
  }

  export type HoroscopeProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId?: number
    AND?: HoroscopeProfileWhereInput | HoroscopeProfileWhereInput[]
    OR?: HoroscopeProfileWhereInput[]
    NOT?: HoroscopeProfileWhereInput | HoroscopeProfileWhereInput[]
    zodiacSign?: StringFilter<"HoroscopeProfile"> | string
    tamilYear?: StringFilter<"HoroscopeProfile"> | string
    tamilMonth?: StringFilter<"HoroscopeProfile"> | string
    udayathiNatchat?: StringFilter<"HoroscopeProfile"> | string
    day?: StringFilter<"HoroscopeProfile"> | string
    birthTime?: StringFilter<"HoroscopeProfile"> | string
    starFoot?: StringFilter<"HoroscopeProfile"> | string
    ascendant?: StringFilter<"HoroscopeProfile"> | string
    birthplace?: StringFilter<"HoroscopeProfile"> | string
    natalDirection?: StringFilter<"HoroscopeProfile"> | string
    horoscopeDocuments?: JsonNullableFilter<"HoroscopeProfile">
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
  }, "id" | "userId">

  export type HoroscopeProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    zodiacSign?: SortOrder
    tamilYear?: SortOrder
    tamilMonth?: SortOrder
    udayathiNatchat?: SortOrder
    day?: SortOrder
    birthTime?: SortOrder
    starFoot?: SortOrder
    ascendant?: SortOrder
    birthplace?: SortOrder
    natalDirection?: SortOrder
    horoscopeDocuments?: SortOrderInput | SortOrder
    _count?: HoroscopeProfileCountOrderByAggregateInput
    _avg?: HoroscopeProfileAvgOrderByAggregateInput
    _max?: HoroscopeProfileMaxOrderByAggregateInput
    _min?: HoroscopeProfileMinOrderByAggregateInput
    _sum?: HoroscopeProfileSumOrderByAggregateInput
  }

  export type HoroscopeProfileScalarWhereWithAggregatesInput = {
    AND?: HoroscopeProfileScalarWhereWithAggregatesInput | HoroscopeProfileScalarWhereWithAggregatesInput[]
    OR?: HoroscopeProfileScalarWhereWithAggregatesInput[]
    NOT?: HoroscopeProfileScalarWhereWithAggregatesInput | HoroscopeProfileScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"HoroscopeProfile"> | number
    userId?: IntWithAggregatesFilter<"HoroscopeProfile"> | number
    zodiacSign?: StringWithAggregatesFilter<"HoroscopeProfile"> | string
    tamilYear?: StringWithAggregatesFilter<"HoroscopeProfile"> | string
    tamilMonth?: StringWithAggregatesFilter<"HoroscopeProfile"> | string
    udayathiNatchat?: StringWithAggregatesFilter<"HoroscopeProfile"> | string
    day?: StringWithAggregatesFilter<"HoroscopeProfile"> | string
    birthTime?: StringWithAggregatesFilter<"HoroscopeProfile"> | string
    starFoot?: StringWithAggregatesFilter<"HoroscopeProfile"> | string
    ascendant?: StringWithAggregatesFilter<"HoroscopeProfile"> | string
    birthplace?: StringWithAggregatesFilter<"HoroscopeProfile"> | string
    natalDirection?: StringWithAggregatesFilter<"HoroscopeProfile"> | string
    horoscopeDocuments?: JsonNullableWithAggregatesFilter<"HoroscopeProfile">
  }

  export type ProfileViewWhereInput = {
    AND?: ProfileViewWhereInput | ProfileViewWhereInput[]
    OR?: ProfileViewWhereInput[]
    NOT?: ProfileViewWhereInput | ProfileViewWhereInput[]
    id?: IntFilter<"ProfileView"> | number
    userId?: IntFilter<"ProfileView"> | number
    profileId?: IntFilter<"ProfileView"> | number
    viewedAt?: DateTimeFilter<"ProfileView"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ProfileViewOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    profileId?: SortOrder
    viewedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ProfileViewWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId_profileId?: ProfileViewUserIdProfileIdCompoundUniqueInput
    AND?: ProfileViewWhereInput | ProfileViewWhereInput[]
    OR?: ProfileViewWhereInput[]
    NOT?: ProfileViewWhereInput | ProfileViewWhereInput[]
    userId?: IntFilter<"ProfileView"> | number
    profileId?: IntFilter<"ProfileView"> | number
    viewedAt?: DateTimeFilter<"ProfileView"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_profileId">

  export type ProfileViewOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    profileId?: SortOrder
    viewedAt?: SortOrder
    _count?: ProfileViewCountOrderByAggregateInput
    _avg?: ProfileViewAvgOrderByAggregateInput
    _max?: ProfileViewMaxOrderByAggregateInput
    _min?: ProfileViewMinOrderByAggregateInput
    _sum?: ProfileViewSumOrderByAggregateInput
  }

  export type ProfileViewScalarWhereWithAggregatesInput = {
    AND?: ProfileViewScalarWhereWithAggregatesInput | ProfileViewScalarWhereWithAggregatesInput[]
    OR?: ProfileViewScalarWhereWithAggregatesInput[]
    NOT?: ProfileViewScalarWhereWithAggregatesInput | ProfileViewScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ProfileView"> | number
    userId?: IntWithAggregatesFilter<"ProfileView"> | number
    profileId?: IntWithAggregatesFilter<"ProfileView"> | number
    viewedAt?: DateTimeWithAggregatesFilter<"ProfileView"> | Date | string
  }

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    id?: IntFilter<"Payment"> | number
    customerName?: StringFilter<"Payment"> | string
    transactionAmount?: FloatFilter<"Payment"> | number
    transactionDate?: DateTimeFilter<"Payment"> | Date | string
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
  }

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder
    customerName?: SortOrder
    transactionAmount?: SortOrder
    transactionDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _relevance?: PaymentOrderByRelevanceInput
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    customerName?: StringFilter<"Payment"> | string
    transactionAmount?: FloatFilter<"Payment"> | number
    transactionDate?: DateTimeFilter<"Payment"> | Date | string
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
  }, "id">

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder
    customerName?: SortOrder
    transactionAmount?: SortOrder
    transactionDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PaymentCountOrderByAggregateInput
    _avg?: PaymentAvgOrderByAggregateInput
    _max?: PaymentMaxOrderByAggregateInput
    _min?: PaymentMinOrderByAggregateInput
    _sum?: PaymentSumOrderByAggregateInput
  }

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    OR?: PaymentScalarWhereWithAggregatesInput[]
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Payment"> | number
    customerName?: StringWithAggregatesFilter<"Payment"> | string
    transactionAmount?: FloatWithAggregatesFilter<"Payment"> | number
    transactionDate?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
  }

  export type UserCreateInput = {
    email: string
    password: string
    firstName: string
    lastName: string
    isActive?: boolean
    credits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileCreateNestedOneWithoutUserInput
    profileViews?: ProfileViewCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    password: string
    firstName: string
    lastName: string
    isActive?: boolean
    credits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    profileViews?: ProfileViewUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    credits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneWithoutUserNestedInput
    profileViews?: ProfileViewUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    credits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    profileViews?: ProfileViewUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    password: string
    firstName: string
    lastName: string
    isActive?: boolean
    credits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    credits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    credits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileCreateInput = {
    firstName: string
    lastName: string
    age?: number | null
    regNo: string
    liked?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProfileInput
    userProfile?: UserProfileCreateNestedOneWithoutProfileInput
    parentInfo?: ParentInfoCreateNestedOneWithoutProfileInput
    horoscopeProfile?: HoroscopeProfileCreateNestedOneWithoutProfileInput
  }

  export type ProfileUncheckedCreateInput = {
    id?: number
    userId: number
    firstName: string
    lastName: string
    age?: number | null
    regNo: string
    liked?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userProfile?: UserProfileUncheckedCreateNestedOneWithoutProfileInput
    parentInfo?: ParentInfoUncheckedCreateNestedOneWithoutProfileInput
    horoscopeProfile?: HoroscopeProfileUncheckedCreateNestedOneWithoutProfileInput
  }

  export type ProfileUpdateInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    regNo?: StringFieldUpdateOperationsInput | string
    liked?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProfileNestedInput
    userProfile?: UserProfileUpdateOneWithoutProfileNestedInput
    parentInfo?: ParentInfoUpdateOneWithoutProfileNestedInput
    horoscopeProfile?: HoroscopeProfileUpdateOneWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    regNo?: StringFieldUpdateOperationsInput | string
    liked?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userProfile?: UserProfileUncheckedUpdateOneWithoutProfileNestedInput
    parentInfo?: ParentInfoUncheckedUpdateOneWithoutProfileNestedInput
    horoscopeProfile?: HoroscopeProfileUncheckedUpdateOneWithoutProfileNestedInput
  }

  export type ProfileCreateManyInput = {
    id?: number
    userId: number
    firstName: string
    lastName: string
    age?: number | null
    regNo: string
    liked?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfileUpdateManyMutationInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    regNo?: StringFieldUpdateOperationsInput | string
    liked?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    regNo?: StringFieldUpdateOperationsInput | string
    liked?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserProfileCreateInput = {
    type: string
    dietType: string
    dob: Date | string
    age: number
    height: string
    color: string
    education: string
    career: string
    salary: string
    familyProperty: string
    expectation: string
    phone: string
    caste: string
    marriageStatus: string
    profilePhotos: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    profile: ProfileCreateNestedOneWithoutUserProfileInput
  }

  export type UserProfileUncheckedCreateInput = {
    id?: number
    userId: number
    type: string
    dietType: string
    dob: Date | string
    age: number
    height: string
    color: string
    education: string
    career: string
    salary: string
    familyProperty: string
    expectation: string
    phone: string
    caste: string
    marriageStatus: string
    profilePhotos: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserProfileUpdateInput = {
    type?: StringFieldUpdateOperationsInput | string
    dietType?: StringFieldUpdateOperationsInput | string
    dob?: DateTimeFieldUpdateOperationsInput | Date | string
    age?: IntFieldUpdateOperationsInput | number
    height?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    education?: StringFieldUpdateOperationsInput | string
    career?: StringFieldUpdateOperationsInput | string
    salary?: StringFieldUpdateOperationsInput | string
    familyProperty?: StringFieldUpdateOperationsInput | string
    expectation?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    caste?: StringFieldUpdateOperationsInput | string
    marriageStatus?: StringFieldUpdateOperationsInput | string
    profilePhotos?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutUserProfileNestedInput
  }

  export type UserProfileUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    dietType?: StringFieldUpdateOperationsInput | string
    dob?: DateTimeFieldUpdateOperationsInput | Date | string
    age?: IntFieldUpdateOperationsInput | number
    height?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    education?: StringFieldUpdateOperationsInput | string
    career?: StringFieldUpdateOperationsInput | string
    salary?: StringFieldUpdateOperationsInput | string
    familyProperty?: StringFieldUpdateOperationsInput | string
    expectation?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    caste?: StringFieldUpdateOperationsInput | string
    marriageStatus?: StringFieldUpdateOperationsInput | string
    profilePhotos?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserProfileCreateManyInput = {
    id?: number
    userId: number
    type: string
    dietType: string
    dob: Date | string
    age: number
    height: string
    color: string
    education: string
    career: string
    salary: string
    familyProperty: string
    expectation: string
    phone: string
    caste: string
    marriageStatus: string
    profilePhotos: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserProfileUpdateManyMutationInput = {
    type?: StringFieldUpdateOperationsInput | string
    dietType?: StringFieldUpdateOperationsInput | string
    dob?: DateTimeFieldUpdateOperationsInput | Date | string
    age?: IntFieldUpdateOperationsInput | number
    height?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    education?: StringFieldUpdateOperationsInput | string
    career?: StringFieldUpdateOperationsInput | string
    salary?: StringFieldUpdateOperationsInput | string
    familyProperty?: StringFieldUpdateOperationsInput | string
    expectation?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    caste?: StringFieldUpdateOperationsInput | string
    marriageStatus?: StringFieldUpdateOperationsInput | string
    profilePhotos?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserProfileUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    dietType?: StringFieldUpdateOperationsInput | string
    dob?: DateTimeFieldUpdateOperationsInput | Date | string
    age?: IntFieldUpdateOperationsInput | number
    height?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    education?: StringFieldUpdateOperationsInput | string
    career?: StringFieldUpdateOperationsInput | string
    salary?: StringFieldUpdateOperationsInput | string
    familyProperty?: StringFieldUpdateOperationsInput | string
    expectation?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    caste?: StringFieldUpdateOperationsInput | string
    marriageStatus?: StringFieldUpdateOperationsInput | string
    profilePhotos?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParentInfoCreateInput = {
    fatherName: string
    motherName: string
    fatherNative: string
    motherNative: string
    fatherProfession: string
    motherProfession: string
    phone: string
    address: string
    brothers: number
    elderBrothers: number
    youngerBrothers: number
    marriedBrothers: number
    sisters: number
    elderSisters: number
    youngerSisters: number
    marriedSisters: number
    profile: ProfileCreateNestedOneWithoutParentInfoInput
  }

  export type ParentInfoUncheckedCreateInput = {
    id?: number
    userId: number
    fatherName: string
    motherName: string
    fatherNative: string
    motherNative: string
    fatherProfession: string
    motherProfession: string
    phone: string
    address: string
    brothers: number
    elderBrothers: number
    youngerBrothers: number
    marriedBrothers: number
    sisters: number
    elderSisters: number
    youngerSisters: number
    marriedSisters: number
  }

  export type ParentInfoUpdateInput = {
    fatherName?: StringFieldUpdateOperationsInput | string
    motherName?: StringFieldUpdateOperationsInput | string
    fatherNative?: StringFieldUpdateOperationsInput | string
    motherNative?: StringFieldUpdateOperationsInput | string
    fatherProfession?: StringFieldUpdateOperationsInput | string
    motherProfession?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    brothers?: IntFieldUpdateOperationsInput | number
    elderBrothers?: IntFieldUpdateOperationsInput | number
    youngerBrothers?: IntFieldUpdateOperationsInput | number
    marriedBrothers?: IntFieldUpdateOperationsInput | number
    sisters?: IntFieldUpdateOperationsInput | number
    elderSisters?: IntFieldUpdateOperationsInput | number
    youngerSisters?: IntFieldUpdateOperationsInput | number
    marriedSisters?: IntFieldUpdateOperationsInput | number
    profile?: ProfileUpdateOneRequiredWithoutParentInfoNestedInput
  }

  export type ParentInfoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    fatherName?: StringFieldUpdateOperationsInput | string
    motherName?: StringFieldUpdateOperationsInput | string
    fatherNative?: StringFieldUpdateOperationsInput | string
    motherNative?: StringFieldUpdateOperationsInput | string
    fatherProfession?: StringFieldUpdateOperationsInput | string
    motherProfession?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    brothers?: IntFieldUpdateOperationsInput | number
    elderBrothers?: IntFieldUpdateOperationsInput | number
    youngerBrothers?: IntFieldUpdateOperationsInput | number
    marriedBrothers?: IntFieldUpdateOperationsInput | number
    sisters?: IntFieldUpdateOperationsInput | number
    elderSisters?: IntFieldUpdateOperationsInput | number
    youngerSisters?: IntFieldUpdateOperationsInput | number
    marriedSisters?: IntFieldUpdateOperationsInput | number
  }

  export type ParentInfoCreateManyInput = {
    id?: number
    userId: number
    fatherName: string
    motherName: string
    fatherNative: string
    motherNative: string
    fatherProfession: string
    motherProfession: string
    phone: string
    address: string
    brothers: number
    elderBrothers: number
    youngerBrothers: number
    marriedBrothers: number
    sisters: number
    elderSisters: number
    youngerSisters: number
    marriedSisters: number
  }

  export type ParentInfoUpdateManyMutationInput = {
    fatherName?: StringFieldUpdateOperationsInput | string
    motherName?: StringFieldUpdateOperationsInput | string
    fatherNative?: StringFieldUpdateOperationsInput | string
    motherNative?: StringFieldUpdateOperationsInput | string
    fatherProfession?: StringFieldUpdateOperationsInput | string
    motherProfession?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    brothers?: IntFieldUpdateOperationsInput | number
    elderBrothers?: IntFieldUpdateOperationsInput | number
    youngerBrothers?: IntFieldUpdateOperationsInput | number
    marriedBrothers?: IntFieldUpdateOperationsInput | number
    sisters?: IntFieldUpdateOperationsInput | number
    elderSisters?: IntFieldUpdateOperationsInput | number
    youngerSisters?: IntFieldUpdateOperationsInput | number
    marriedSisters?: IntFieldUpdateOperationsInput | number
  }

  export type ParentInfoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    fatherName?: StringFieldUpdateOperationsInput | string
    motherName?: StringFieldUpdateOperationsInput | string
    fatherNative?: StringFieldUpdateOperationsInput | string
    motherNative?: StringFieldUpdateOperationsInput | string
    fatherProfession?: StringFieldUpdateOperationsInput | string
    motherProfession?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    brothers?: IntFieldUpdateOperationsInput | number
    elderBrothers?: IntFieldUpdateOperationsInput | number
    youngerBrothers?: IntFieldUpdateOperationsInput | number
    marriedBrothers?: IntFieldUpdateOperationsInput | number
    sisters?: IntFieldUpdateOperationsInput | number
    elderSisters?: IntFieldUpdateOperationsInput | number
    youngerSisters?: IntFieldUpdateOperationsInput | number
    marriedSisters?: IntFieldUpdateOperationsInput | number
  }

  export type HoroscopeProfileCreateInput = {
    zodiacSign: string
    tamilYear: string
    tamilMonth: string
    udayathiNatchat: string
    day: string
    birthTime: string
    starFoot: string
    ascendant: string
    birthplace: string
    natalDirection: string
    horoscopeDocuments?: NullableJsonNullValueInput | InputJsonValue
    profile: ProfileCreateNestedOneWithoutHoroscopeProfileInput
  }

  export type HoroscopeProfileUncheckedCreateInput = {
    id?: number
    userId: number
    zodiacSign: string
    tamilYear: string
    tamilMonth: string
    udayathiNatchat: string
    day: string
    birthTime: string
    starFoot: string
    ascendant: string
    birthplace: string
    natalDirection: string
    horoscopeDocuments?: NullableJsonNullValueInput | InputJsonValue
  }

  export type HoroscopeProfileUpdateInput = {
    zodiacSign?: StringFieldUpdateOperationsInput | string
    tamilYear?: StringFieldUpdateOperationsInput | string
    tamilMonth?: StringFieldUpdateOperationsInput | string
    udayathiNatchat?: StringFieldUpdateOperationsInput | string
    day?: StringFieldUpdateOperationsInput | string
    birthTime?: StringFieldUpdateOperationsInput | string
    starFoot?: StringFieldUpdateOperationsInput | string
    ascendant?: StringFieldUpdateOperationsInput | string
    birthplace?: StringFieldUpdateOperationsInput | string
    natalDirection?: StringFieldUpdateOperationsInput | string
    horoscopeDocuments?: NullableJsonNullValueInput | InputJsonValue
    profile?: ProfileUpdateOneRequiredWithoutHoroscopeProfileNestedInput
  }

  export type HoroscopeProfileUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    zodiacSign?: StringFieldUpdateOperationsInput | string
    tamilYear?: StringFieldUpdateOperationsInput | string
    tamilMonth?: StringFieldUpdateOperationsInput | string
    udayathiNatchat?: StringFieldUpdateOperationsInput | string
    day?: StringFieldUpdateOperationsInput | string
    birthTime?: StringFieldUpdateOperationsInput | string
    starFoot?: StringFieldUpdateOperationsInput | string
    ascendant?: StringFieldUpdateOperationsInput | string
    birthplace?: StringFieldUpdateOperationsInput | string
    natalDirection?: StringFieldUpdateOperationsInput | string
    horoscopeDocuments?: NullableJsonNullValueInput | InputJsonValue
  }

  export type HoroscopeProfileCreateManyInput = {
    id?: number
    userId: number
    zodiacSign: string
    tamilYear: string
    tamilMonth: string
    udayathiNatchat: string
    day: string
    birthTime: string
    starFoot: string
    ascendant: string
    birthplace: string
    natalDirection: string
    horoscopeDocuments?: NullableJsonNullValueInput | InputJsonValue
  }

  export type HoroscopeProfileUpdateManyMutationInput = {
    zodiacSign?: StringFieldUpdateOperationsInput | string
    tamilYear?: StringFieldUpdateOperationsInput | string
    tamilMonth?: StringFieldUpdateOperationsInput | string
    udayathiNatchat?: StringFieldUpdateOperationsInput | string
    day?: StringFieldUpdateOperationsInput | string
    birthTime?: StringFieldUpdateOperationsInput | string
    starFoot?: StringFieldUpdateOperationsInput | string
    ascendant?: StringFieldUpdateOperationsInput | string
    birthplace?: StringFieldUpdateOperationsInput | string
    natalDirection?: StringFieldUpdateOperationsInput | string
    horoscopeDocuments?: NullableJsonNullValueInput | InputJsonValue
  }

  export type HoroscopeProfileUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    zodiacSign?: StringFieldUpdateOperationsInput | string
    tamilYear?: StringFieldUpdateOperationsInput | string
    tamilMonth?: StringFieldUpdateOperationsInput | string
    udayathiNatchat?: StringFieldUpdateOperationsInput | string
    day?: StringFieldUpdateOperationsInput | string
    birthTime?: StringFieldUpdateOperationsInput | string
    starFoot?: StringFieldUpdateOperationsInput | string
    ascendant?: StringFieldUpdateOperationsInput | string
    birthplace?: StringFieldUpdateOperationsInput | string
    natalDirection?: StringFieldUpdateOperationsInput | string
    horoscopeDocuments?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ProfileViewCreateInput = {
    profileId: number
    viewedAt?: Date | string
    user: UserCreateNestedOneWithoutProfileViewsInput
  }

  export type ProfileViewUncheckedCreateInput = {
    id?: number
    userId: number
    profileId: number
    viewedAt?: Date | string
  }

  export type ProfileViewUpdateInput = {
    profileId?: IntFieldUpdateOperationsInput | number
    viewedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProfileViewsNestedInput
  }

  export type ProfileViewUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    profileId?: IntFieldUpdateOperationsInput | number
    viewedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileViewCreateManyInput = {
    id?: number
    userId: number
    profileId: number
    viewedAt?: Date | string
  }

  export type ProfileViewUpdateManyMutationInput = {
    profileId?: IntFieldUpdateOperationsInput | number
    viewedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileViewUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    profileId?: IntFieldUpdateOperationsInput | number
    viewedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateInput = {
    customerName: string
    transactionAmount: number
    transactionDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUncheckedCreateInput = {
    id?: number
    customerName: string
    transactionAmount: number
    transactionDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateInput = {
    customerName?: StringFieldUpdateOperationsInput | string
    transactionAmount?: FloatFieldUpdateOperationsInput | number
    transactionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    customerName?: StringFieldUpdateOperationsInput | string
    transactionAmount?: FloatFieldUpdateOperationsInput | number
    transactionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateManyInput = {
    id?: number
    customerName: string
    transactionAmount: number
    transactionDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateManyMutationInput = {
    customerName?: StringFieldUpdateOperationsInput | string
    transactionAmount?: FloatFieldUpdateOperationsInput | number
    transactionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    customerName?: StringFieldUpdateOperationsInput | string
    transactionAmount?: FloatFieldUpdateOperationsInput | number
    transactionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ProfileNullableScalarRelationFilter = {
    is?: ProfileWhereInput | null
    isNot?: ProfileWhereInput | null
  }

  export type ProfileViewListRelationFilter = {
    every?: ProfileViewWhereInput
    some?: ProfileViewWhereInput
    none?: ProfileViewWhereInput
  }

  export type ProfileViewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    isActive?: SortOrder
    credits?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
    credits?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    isActive?: SortOrder
    credits?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    isActive?: SortOrder
    credits?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
    credits?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserProfileNullableScalarRelationFilter = {
    is?: UserProfileWhereInput | null
    isNot?: UserProfileWhereInput | null
  }

  export type ParentInfoNullableScalarRelationFilter = {
    is?: ParentInfoWhereInput | null
    isNot?: ParentInfoWhereInput | null
  }

  export type HoroscopeProfileNullableScalarRelationFilter = {
    is?: HoroscopeProfileWhereInput | null
    isNot?: HoroscopeProfileWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProfileOrderByRelevanceInput = {
    fields: ProfileOrderByRelevanceFieldEnum | ProfileOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    age?: SortOrder
    regNo?: SortOrder
    liked?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfileAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    age?: SortOrder
  }

  export type ProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    age?: SortOrder
    regNo?: SortOrder
    liked?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    age?: SortOrder
    regNo?: SortOrder
    liked?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfileSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    age?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ProfileScalarRelationFilter = {
    is?: ProfileWhereInput
    isNot?: ProfileWhereInput
  }

  export type UserProfileOrderByRelevanceInput = {
    fields: UserProfileOrderByRelevanceFieldEnum | UserProfileOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    dietType?: SortOrder
    dob?: SortOrder
    age?: SortOrder
    height?: SortOrder
    color?: SortOrder
    education?: SortOrder
    career?: SortOrder
    salary?: SortOrder
    familyProperty?: SortOrder
    expectation?: SortOrder
    phone?: SortOrder
    caste?: SortOrder
    marriageStatus?: SortOrder
    profilePhotos?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserProfileAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    age?: SortOrder
  }

  export type UserProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    dietType?: SortOrder
    dob?: SortOrder
    age?: SortOrder
    height?: SortOrder
    color?: SortOrder
    education?: SortOrder
    career?: SortOrder
    salary?: SortOrder
    familyProperty?: SortOrder
    expectation?: SortOrder
    phone?: SortOrder
    caste?: SortOrder
    marriageStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    dietType?: SortOrder
    dob?: SortOrder
    age?: SortOrder
    height?: SortOrder
    color?: SortOrder
    education?: SortOrder
    career?: SortOrder
    salary?: SortOrder
    familyProperty?: SortOrder
    expectation?: SortOrder
    phone?: SortOrder
    caste?: SortOrder
    marriageStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserProfileSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    age?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type ParentInfoOrderByRelevanceInput = {
    fields: ParentInfoOrderByRelevanceFieldEnum | ParentInfoOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ParentInfoCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fatherName?: SortOrder
    motherName?: SortOrder
    fatherNative?: SortOrder
    motherNative?: SortOrder
    fatherProfession?: SortOrder
    motherProfession?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    brothers?: SortOrder
    elderBrothers?: SortOrder
    youngerBrothers?: SortOrder
    marriedBrothers?: SortOrder
    sisters?: SortOrder
    elderSisters?: SortOrder
    youngerSisters?: SortOrder
    marriedSisters?: SortOrder
  }

  export type ParentInfoAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    brothers?: SortOrder
    elderBrothers?: SortOrder
    youngerBrothers?: SortOrder
    marriedBrothers?: SortOrder
    sisters?: SortOrder
    elderSisters?: SortOrder
    youngerSisters?: SortOrder
    marriedSisters?: SortOrder
  }

  export type ParentInfoMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fatherName?: SortOrder
    motherName?: SortOrder
    fatherNative?: SortOrder
    motherNative?: SortOrder
    fatherProfession?: SortOrder
    motherProfession?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    brothers?: SortOrder
    elderBrothers?: SortOrder
    youngerBrothers?: SortOrder
    marriedBrothers?: SortOrder
    sisters?: SortOrder
    elderSisters?: SortOrder
    youngerSisters?: SortOrder
    marriedSisters?: SortOrder
  }

  export type ParentInfoMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fatherName?: SortOrder
    motherName?: SortOrder
    fatherNative?: SortOrder
    motherNative?: SortOrder
    fatherProfession?: SortOrder
    motherProfession?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    brothers?: SortOrder
    elderBrothers?: SortOrder
    youngerBrothers?: SortOrder
    marriedBrothers?: SortOrder
    sisters?: SortOrder
    elderSisters?: SortOrder
    youngerSisters?: SortOrder
    marriedSisters?: SortOrder
  }

  export type ParentInfoSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    brothers?: SortOrder
    elderBrothers?: SortOrder
    youngerBrothers?: SortOrder
    marriedBrothers?: SortOrder
    sisters?: SortOrder
    elderSisters?: SortOrder
    youngerSisters?: SortOrder
    marriedSisters?: SortOrder
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type HoroscopeProfileOrderByRelevanceInput = {
    fields: HoroscopeProfileOrderByRelevanceFieldEnum | HoroscopeProfileOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type HoroscopeProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    zodiacSign?: SortOrder
    tamilYear?: SortOrder
    tamilMonth?: SortOrder
    udayathiNatchat?: SortOrder
    day?: SortOrder
    birthTime?: SortOrder
    starFoot?: SortOrder
    ascendant?: SortOrder
    birthplace?: SortOrder
    natalDirection?: SortOrder
    horoscopeDocuments?: SortOrder
  }

  export type HoroscopeProfileAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type HoroscopeProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    zodiacSign?: SortOrder
    tamilYear?: SortOrder
    tamilMonth?: SortOrder
    udayathiNatchat?: SortOrder
    day?: SortOrder
    birthTime?: SortOrder
    starFoot?: SortOrder
    ascendant?: SortOrder
    birthplace?: SortOrder
    natalDirection?: SortOrder
  }

  export type HoroscopeProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    zodiacSign?: SortOrder
    tamilYear?: SortOrder
    tamilMonth?: SortOrder
    udayathiNatchat?: SortOrder
    day?: SortOrder
    birthTime?: SortOrder
    starFoot?: SortOrder
    ascendant?: SortOrder
    birthplace?: SortOrder
    natalDirection?: SortOrder
  }

  export type HoroscopeProfileSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type ProfileViewUserIdProfileIdCompoundUniqueInput = {
    userId: number
    profileId: number
  }

  export type ProfileViewCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    profileId?: SortOrder
    viewedAt?: SortOrder
  }

  export type ProfileViewAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    profileId?: SortOrder
  }

  export type ProfileViewMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    profileId?: SortOrder
    viewedAt?: SortOrder
  }

  export type ProfileViewMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    profileId?: SortOrder
    viewedAt?: SortOrder
  }

  export type ProfileViewSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    profileId?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type PaymentOrderByRelevanceInput = {
    fields: PaymentOrderByRelevanceFieldEnum | PaymentOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder
    customerName?: SortOrder
    transactionAmount?: SortOrder
    transactionDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    id?: SortOrder
    transactionAmount?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    customerName?: SortOrder
    transactionAmount?: SortOrder
    transactionDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder
    customerName?: SortOrder
    transactionAmount?: SortOrder
    transactionDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    id?: SortOrder
    transactionAmount?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type ProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    connect?: ProfileWhereUniqueInput
  }

  export type ProfileViewCreateNestedManyWithoutUserInput = {
    create?: XOR<ProfileViewCreateWithoutUserInput, ProfileViewUncheckedCreateWithoutUserInput> | ProfileViewCreateWithoutUserInput[] | ProfileViewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProfileViewCreateOrConnectWithoutUserInput | ProfileViewCreateOrConnectWithoutUserInput[]
    createMany?: ProfileViewCreateManyUserInputEnvelope
    connect?: ProfileViewWhereUniqueInput | ProfileViewWhereUniqueInput[]
  }

  export type ProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    connect?: ProfileWhereUniqueInput
  }

  export type ProfileViewUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProfileViewCreateWithoutUserInput, ProfileViewUncheckedCreateWithoutUserInput> | ProfileViewCreateWithoutUserInput[] | ProfileViewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProfileViewCreateOrConnectWithoutUserInput | ProfileViewCreateOrConnectWithoutUserInput[]
    createMany?: ProfileViewCreateManyUserInputEnvelope
    connect?: ProfileViewWhereUniqueInput | ProfileViewWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    upsert?: ProfileUpsertWithoutUserInput
    disconnect?: ProfileWhereInput | boolean
    delete?: ProfileWhereInput | boolean
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutUserInput, ProfileUpdateWithoutUserInput>, ProfileUncheckedUpdateWithoutUserInput>
  }

  export type ProfileViewUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProfileViewCreateWithoutUserInput, ProfileViewUncheckedCreateWithoutUserInput> | ProfileViewCreateWithoutUserInput[] | ProfileViewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProfileViewCreateOrConnectWithoutUserInput | ProfileViewCreateOrConnectWithoutUserInput[]
    upsert?: ProfileViewUpsertWithWhereUniqueWithoutUserInput | ProfileViewUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProfileViewCreateManyUserInputEnvelope
    set?: ProfileViewWhereUniqueInput | ProfileViewWhereUniqueInput[]
    disconnect?: ProfileViewWhereUniqueInput | ProfileViewWhereUniqueInput[]
    delete?: ProfileViewWhereUniqueInput | ProfileViewWhereUniqueInput[]
    connect?: ProfileViewWhereUniqueInput | ProfileViewWhereUniqueInput[]
    update?: ProfileViewUpdateWithWhereUniqueWithoutUserInput | ProfileViewUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProfileViewUpdateManyWithWhereWithoutUserInput | ProfileViewUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProfileViewScalarWhereInput | ProfileViewScalarWhereInput[]
  }

  export type ProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    upsert?: ProfileUpsertWithoutUserInput
    disconnect?: ProfileWhereInput | boolean
    delete?: ProfileWhereInput | boolean
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutUserInput, ProfileUpdateWithoutUserInput>, ProfileUncheckedUpdateWithoutUserInput>
  }

  export type ProfileViewUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProfileViewCreateWithoutUserInput, ProfileViewUncheckedCreateWithoutUserInput> | ProfileViewCreateWithoutUserInput[] | ProfileViewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProfileViewCreateOrConnectWithoutUserInput | ProfileViewCreateOrConnectWithoutUserInput[]
    upsert?: ProfileViewUpsertWithWhereUniqueWithoutUserInput | ProfileViewUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProfileViewCreateManyUserInputEnvelope
    set?: ProfileViewWhereUniqueInput | ProfileViewWhereUniqueInput[]
    disconnect?: ProfileViewWhereUniqueInput | ProfileViewWhereUniqueInput[]
    delete?: ProfileViewWhereUniqueInput | ProfileViewWhereUniqueInput[]
    connect?: ProfileViewWhereUniqueInput | ProfileViewWhereUniqueInput[]
    update?: ProfileViewUpdateWithWhereUniqueWithoutUserInput | ProfileViewUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProfileViewUpdateManyWithWhereWithoutUserInput | ProfileViewUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProfileViewScalarWhereInput | ProfileViewScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutProfileInput = {
    create?: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfileInput
    connect?: UserWhereUniqueInput
  }

  export type UserProfileCreateNestedOneWithoutProfileInput = {
    create?: XOR<UserProfileCreateWithoutProfileInput, UserProfileUncheckedCreateWithoutProfileInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutProfileInput
    connect?: UserProfileWhereUniqueInput
  }

  export type ParentInfoCreateNestedOneWithoutProfileInput = {
    create?: XOR<ParentInfoCreateWithoutProfileInput, ParentInfoUncheckedCreateWithoutProfileInput>
    connectOrCreate?: ParentInfoCreateOrConnectWithoutProfileInput
    connect?: ParentInfoWhereUniqueInput
  }

  export type HoroscopeProfileCreateNestedOneWithoutProfileInput = {
    create?: XOR<HoroscopeProfileCreateWithoutProfileInput, HoroscopeProfileUncheckedCreateWithoutProfileInput>
    connectOrCreate?: HoroscopeProfileCreateOrConnectWithoutProfileInput
    connect?: HoroscopeProfileWhereUniqueInput
  }

  export type UserProfileUncheckedCreateNestedOneWithoutProfileInput = {
    create?: XOR<UserProfileCreateWithoutProfileInput, UserProfileUncheckedCreateWithoutProfileInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutProfileInput
    connect?: UserProfileWhereUniqueInput
  }

  export type ParentInfoUncheckedCreateNestedOneWithoutProfileInput = {
    create?: XOR<ParentInfoCreateWithoutProfileInput, ParentInfoUncheckedCreateWithoutProfileInput>
    connectOrCreate?: ParentInfoCreateOrConnectWithoutProfileInput
    connect?: ParentInfoWhereUniqueInput
  }

  export type HoroscopeProfileUncheckedCreateNestedOneWithoutProfileInput = {
    create?: XOR<HoroscopeProfileCreateWithoutProfileInput, HoroscopeProfileUncheckedCreateWithoutProfileInput>
    connectOrCreate?: HoroscopeProfileCreateOrConnectWithoutProfileInput
    connect?: HoroscopeProfileWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type UserUpdateOneRequiredWithoutProfileNestedInput = {
    create?: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfileInput
    upsert?: UserUpsertWithoutProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProfileInput, UserUpdateWithoutProfileInput>, UserUncheckedUpdateWithoutProfileInput>
  }

  export type UserProfileUpdateOneWithoutProfileNestedInput = {
    create?: XOR<UserProfileCreateWithoutProfileInput, UserProfileUncheckedCreateWithoutProfileInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutProfileInput
    upsert?: UserProfileUpsertWithoutProfileInput
    disconnect?: UserProfileWhereInput | boolean
    delete?: UserProfileWhereInput | boolean
    connect?: UserProfileWhereUniqueInput
    update?: XOR<XOR<UserProfileUpdateToOneWithWhereWithoutProfileInput, UserProfileUpdateWithoutProfileInput>, UserProfileUncheckedUpdateWithoutProfileInput>
  }

  export type ParentInfoUpdateOneWithoutProfileNestedInput = {
    create?: XOR<ParentInfoCreateWithoutProfileInput, ParentInfoUncheckedCreateWithoutProfileInput>
    connectOrCreate?: ParentInfoCreateOrConnectWithoutProfileInput
    upsert?: ParentInfoUpsertWithoutProfileInput
    disconnect?: ParentInfoWhereInput | boolean
    delete?: ParentInfoWhereInput | boolean
    connect?: ParentInfoWhereUniqueInput
    update?: XOR<XOR<ParentInfoUpdateToOneWithWhereWithoutProfileInput, ParentInfoUpdateWithoutProfileInput>, ParentInfoUncheckedUpdateWithoutProfileInput>
  }

  export type HoroscopeProfileUpdateOneWithoutProfileNestedInput = {
    create?: XOR<HoroscopeProfileCreateWithoutProfileInput, HoroscopeProfileUncheckedCreateWithoutProfileInput>
    connectOrCreate?: HoroscopeProfileCreateOrConnectWithoutProfileInput
    upsert?: HoroscopeProfileUpsertWithoutProfileInput
    disconnect?: HoroscopeProfileWhereInput | boolean
    delete?: HoroscopeProfileWhereInput | boolean
    connect?: HoroscopeProfileWhereUniqueInput
    update?: XOR<XOR<HoroscopeProfileUpdateToOneWithWhereWithoutProfileInput, HoroscopeProfileUpdateWithoutProfileInput>, HoroscopeProfileUncheckedUpdateWithoutProfileInput>
  }

  export type UserProfileUncheckedUpdateOneWithoutProfileNestedInput = {
    create?: XOR<UserProfileCreateWithoutProfileInput, UserProfileUncheckedCreateWithoutProfileInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutProfileInput
    upsert?: UserProfileUpsertWithoutProfileInput
    disconnect?: UserProfileWhereInput | boolean
    delete?: UserProfileWhereInput | boolean
    connect?: UserProfileWhereUniqueInput
    update?: XOR<XOR<UserProfileUpdateToOneWithWhereWithoutProfileInput, UserProfileUpdateWithoutProfileInput>, UserProfileUncheckedUpdateWithoutProfileInput>
  }

  export type ParentInfoUncheckedUpdateOneWithoutProfileNestedInput = {
    create?: XOR<ParentInfoCreateWithoutProfileInput, ParentInfoUncheckedCreateWithoutProfileInput>
    connectOrCreate?: ParentInfoCreateOrConnectWithoutProfileInput
    upsert?: ParentInfoUpsertWithoutProfileInput
    disconnect?: ParentInfoWhereInput | boolean
    delete?: ParentInfoWhereInput | boolean
    connect?: ParentInfoWhereUniqueInput
    update?: XOR<XOR<ParentInfoUpdateToOneWithWhereWithoutProfileInput, ParentInfoUpdateWithoutProfileInput>, ParentInfoUncheckedUpdateWithoutProfileInput>
  }

  export type HoroscopeProfileUncheckedUpdateOneWithoutProfileNestedInput = {
    create?: XOR<HoroscopeProfileCreateWithoutProfileInput, HoroscopeProfileUncheckedCreateWithoutProfileInput>
    connectOrCreate?: HoroscopeProfileCreateOrConnectWithoutProfileInput
    upsert?: HoroscopeProfileUpsertWithoutProfileInput
    disconnect?: HoroscopeProfileWhereInput | boolean
    delete?: HoroscopeProfileWhereInput | boolean
    connect?: HoroscopeProfileWhereUniqueInput
    update?: XOR<XOR<HoroscopeProfileUpdateToOneWithWhereWithoutProfileInput, HoroscopeProfileUpdateWithoutProfileInput>, HoroscopeProfileUncheckedUpdateWithoutProfileInput>
  }

  export type ProfileCreateNestedOneWithoutUserProfileInput = {
    create?: XOR<ProfileCreateWithoutUserProfileInput, ProfileUncheckedCreateWithoutUserProfileInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserProfileInput
    connect?: ProfileWhereUniqueInput
  }

  export type ProfileUpdateOneRequiredWithoutUserProfileNestedInput = {
    create?: XOR<ProfileCreateWithoutUserProfileInput, ProfileUncheckedCreateWithoutUserProfileInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserProfileInput
    upsert?: ProfileUpsertWithoutUserProfileInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutUserProfileInput, ProfileUpdateWithoutUserProfileInput>, ProfileUncheckedUpdateWithoutUserProfileInput>
  }

  export type ProfileCreateNestedOneWithoutParentInfoInput = {
    create?: XOR<ProfileCreateWithoutParentInfoInput, ProfileUncheckedCreateWithoutParentInfoInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutParentInfoInput
    connect?: ProfileWhereUniqueInput
  }

  export type ProfileUpdateOneRequiredWithoutParentInfoNestedInput = {
    create?: XOR<ProfileCreateWithoutParentInfoInput, ProfileUncheckedCreateWithoutParentInfoInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutParentInfoInput
    upsert?: ProfileUpsertWithoutParentInfoInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutParentInfoInput, ProfileUpdateWithoutParentInfoInput>, ProfileUncheckedUpdateWithoutParentInfoInput>
  }

  export type ProfileCreateNestedOneWithoutHoroscopeProfileInput = {
    create?: XOR<ProfileCreateWithoutHoroscopeProfileInput, ProfileUncheckedCreateWithoutHoroscopeProfileInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutHoroscopeProfileInput
    connect?: ProfileWhereUniqueInput
  }

  export type ProfileUpdateOneRequiredWithoutHoroscopeProfileNestedInput = {
    create?: XOR<ProfileCreateWithoutHoroscopeProfileInput, ProfileUncheckedCreateWithoutHoroscopeProfileInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutHoroscopeProfileInput
    upsert?: ProfileUpsertWithoutHoroscopeProfileInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutHoroscopeProfileInput, ProfileUpdateWithoutHoroscopeProfileInput>, ProfileUncheckedUpdateWithoutHoroscopeProfileInput>
  }

  export type UserCreateNestedOneWithoutProfileViewsInput = {
    create?: XOR<UserCreateWithoutProfileViewsInput, UserUncheckedCreateWithoutProfileViewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfileViewsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutProfileViewsNestedInput = {
    create?: XOR<UserCreateWithoutProfileViewsInput, UserUncheckedCreateWithoutProfileViewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfileViewsInput
    upsert?: UserUpsertWithoutProfileViewsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProfileViewsInput, UserUpdateWithoutProfileViewsInput>, UserUncheckedUpdateWithoutProfileViewsInput>
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type ProfileCreateWithoutUserInput = {
    firstName: string
    lastName: string
    age?: number | null
    regNo: string
    liked?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userProfile?: UserProfileCreateNestedOneWithoutProfileInput
    parentInfo?: ParentInfoCreateNestedOneWithoutProfileInput
    horoscopeProfile?: HoroscopeProfileCreateNestedOneWithoutProfileInput
  }

  export type ProfileUncheckedCreateWithoutUserInput = {
    id?: number
    firstName: string
    lastName: string
    age?: number | null
    regNo: string
    liked?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userProfile?: UserProfileUncheckedCreateNestedOneWithoutProfileInput
    parentInfo?: ParentInfoUncheckedCreateNestedOneWithoutProfileInput
    horoscopeProfile?: HoroscopeProfileUncheckedCreateNestedOneWithoutProfileInput
  }

  export type ProfileCreateOrConnectWithoutUserInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
  }

  export type ProfileViewCreateWithoutUserInput = {
    profileId: number
    viewedAt?: Date | string
  }

  export type ProfileViewUncheckedCreateWithoutUserInput = {
    id?: number
    profileId: number
    viewedAt?: Date | string
  }

  export type ProfileViewCreateOrConnectWithoutUserInput = {
    where: ProfileViewWhereUniqueInput
    create: XOR<ProfileViewCreateWithoutUserInput, ProfileViewUncheckedCreateWithoutUserInput>
  }

  export type ProfileViewCreateManyUserInputEnvelope = {
    data: ProfileViewCreateManyUserInput | ProfileViewCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ProfileUpsertWithoutUserInput = {
    update: XOR<ProfileUpdateWithoutUserInput, ProfileUncheckedUpdateWithoutUserInput>
    create: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutUserInput, ProfileUncheckedUpdateWithoutUserInput>
  }

  export type ProfileUpdateWithoutUserInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    regNo?: StringFieldUpdateOperationsInput | string
    liked?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userProfile?: UserProfileUpdateOneWithoutProfileNestedInput
    parentInfo?: ParentInfoUpdateOneWithoutProfileNestedInput
    horoscopeProfile?: HoroscopeProfileUpdateOneWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    regNo?: StringFieldUpdateOperationsInput | string
    liked?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userProfile?: UserProfileUncheckedUpdateOneWithoutProfileNestedInput
    parentInfo?: ParentInfoUncheckedUpdateOneWithoutProfileNestedInput
    horoscopeProfile?: HoroscopeProfileUncheckedUpdateOneWithoutProfileNestedInput
  }

  export type ProfileViewUpsertWithWhereUniqueWithoutUserInput = {
    where: ProfileViewWhereUniqueInput
    update: XOR<ProfileViewUpdateWithoutUserInput, ProfileViewUncheckedUpdateWithoutUserInput>
    create: XOR<ProfileViewCreateWithoutUserInput, ProfileViewUncheckedCreateWithoutUserInput>
  }

  export type ProfileViewUpdateWithWhereUniqueWithoutUserInput = {
    where: ProfileViewWhereUniqueInput
    data: XOR<ProfileViewUpdateWithoutUserInput, ProfileViewUncheckedUpdateWithoutUserInput>
  }

  export type ProfileViewUpdateManyWithWhereWithoutUserInput = {
    where: ProfileViewScalarWhereInput
    data: XOR<ProfileViewUpdateManyMutationInput, ProfileViewUncheckedUpdateManyWithoutUserInput>
  }

  export type ProfileViewScalarWhereInput = {
    AND?: ProfileViewScalarWhereInput | ProfileViewScalarWhereInput[]
    OR?: ProfileViewScalarWhereInput[]
    NOT?: ProfileViewScalarWhereInput | ProfileViewScalarWhereInput[]
    id?: IntFilter<"ProfileView"> | number
    userId?: IntFilter<"ProfileView"> | number
    profileId?: IntFilter<"ProfileView"> | number
    viewedAt?: DateTimeFilter<"ProfileView"> | Date | string
  }

  export type UserCreateWithoutProfileInput = {
    email: string
    password: string
    firstName: string
    lastName: string
    isActive?: boolean
    credits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    profileViews?: ProfileViewCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProfileInput = {
    id?: number
    email: string
    password: string
    firstName: string
    lastName: string
    isActive?: boolean
    credits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    profileViews?: ProfileViewUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
  }

  export type UserProfileCreateWithoutProfileInput = {
    type: string
    dietType: string
    dob: Date | string
    age: number
    height: string
    color: string
    education: string
    career: string
    salary: string
    familyProperty: string
    expectation: string
    phone: string
    caste: string
    marriageStatus: string
    profilePhotos: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserProfileUncheckedCreateWithoutProfileInput = {
    id?: number
    type: string
    dietType: string
    dob: Date | string
    age: number
    height: string
    color: string
    education: string
    career: string
    salary: string
    familyProperty: string
    expectation: string
    phone: string
    caste: string
    marriageStatus: string
    profilePhotos: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserProfileCreateOrConnectWithoutProfileInput = {
    where: UserProfileWhereUniqueInput
    create: XOR<UserProfileCreateWithoutProfileInput, UserProfileUncheckedCreateWithoutProfileInput>
  }

  export type ParentInfoCreateWithoutProfileInput = {
    fatherName: string
    motherName: string
    fatherNative: string
    motherNative: string
    fatherProfession: string
    motherProfession: string
    phone: string
    address: string
    brothers: number
    elderBrothers: number
    youngerBrothers: number
    marriedBrothers: number
    sisters: number
    elderSisters: number
    youngerSisters: number
    marriedSisters: number
  }

  export type ParentInfoUncheckedCreateWithoutProfileInput = {
    id?: number
    fatherName: string
    motherName: string
    fatherNative: string
    motherNative: string
    fatherProfession: string
    motherProfession: string
    phone: string
    address: string
    brothers: number
    elderBrothers: number
    youngerBrothers: number
    marriedBrothers: number
    sisters: number
    elderSisters: number
    youngerSisters: number
    marriedSisters: number
  }

  export type ParentInfoCreateOrConnectWithoutProfileInput = {
    where: ParentInfoWhereUniqueInput
    create: XOR<ParentInfoCreateWithoutProfileInput, ParentInfoUncheckedCreateWithoutProfileInput>
  }

  export type HoroscopeProfileCreateWithoutProfileInput = {
    zodiacSign: string
    tamilYear: string
    tamilMonth: string
    udayathiNatchat: string
    day: string
    birthTime: string
    starFoot: string
    ascendant: string
    birthplace: string
    natalDirection: string
    horoscopeDocuments?: NullableJsonNullValueInput | InputJsonValue
  }

  export type HoroscopeProfileUncheckedCreateWithoutProfileInput = {
    id?: number
    zodiacSign: string
    tamilYear: string
    tamilMonth: string
    udayathiNatchat: string
    day: string
    birthTime: string
    starFoot: string
    ascendant: string
    birthplace: string
    natalDirection: string
    horoscopeDocuments?: NullableJsonNullValueInput | InputJsonValue
  }

  export type HoroscopeProfileCreateOrConnectWithoutProfileInput = {
    where: HoroscopeProfileWhereUniqueInput
    create: XOR<HoroscopeProfileCreateWithoutProfileInput, HoroscopeProfileUncheckedCreateWithoutProfileInput>
  }

  export type UserUpsertWithoutProfileInput = {
    update: XOR<UserUpdateWithoutProfileInput, UserUncheckedUpdateWithoutProfileInput>
    create: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProfileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProfileInput, UserUncheckedUpdateWithoutProfileInput>
  }

  export type UserUpdateWithoutProfileInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    credits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profileViews?: ProfileViewUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProfileInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    credits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profileViews?: ProfileViewUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserProfileUpsertWithoutProfileInput = {
    update: XOR<UserProfileUpdateWithoutProfileInput, UserProfileUncheckedUpdateWithoutProfileInput>
    create: XOR<UserProfileCreateWithoutProfileInput, UserProfileUncheckedCreateWithoutProfileInput>
    where?: UserProfileWhereInput
  }

  export type UserProfileUpdateToOneWithWhereWithoutProfileInput = {
    where?: UserProfileWhereInput
    data: XOR<UserProfileUpdateWithoutProfileInput, UserProfileUncheckedUpdateWithoutProfileInput>
  }

  export type UserProfileUpdateWithoutProfileInput = {
    type?: StringFieldUpdateOperationsInput | string
    dietType?: StringFieldUpdateOperationsInput | string
    dob?: DateTimeFieldUpdateOperationsInput | Date | string
    age?: IntFieldUpdateOperationsInput | number
    height?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    education?: StringFieldUpdateOperationsInput | string
    career?: StringFieldUpdateOperationsInput | string
    salary?: StringFieldUpdateOperationsInput | string
    familyProperty?: StringFieldUpdateOperationsInput | string
    expectation?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    caste?: StringFieldUpdateOperationsInput | string
    marriageStatus?: StringFieldUpdateOperationsInput | string
    profilePhotos?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserProfileUncheckedUpdateWithoutProfileInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    dietType?: StringFieldUpdateOperationsInput | string
    dob?: DateTimeFieldUpdateOperationsInput | Date | string
    age?: IntFieldUpdateOperationsInput | number
    height?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    education?: StringFieldUpdateOperationsInput | string
    career?: StringFieldUpdateOperationsInput | string
    salary?: StringFieldUpdateOperationsInput | string
    familyProperty?: StringFieldUpdateOperationsInput | string
    expectation?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    caste?: StringFieldUpdateOperationsInput | string
    marriageStatus?: StringFieldUpdateOperationsInput | string
    profilePhotos?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParentInfoUpsertWithoutProfileInput = {
    update: XOR<ParentInfoUpdateWithoutProfileInput, ParentInfoUncheckedUpdateWithoutProfileInput>
    create: XOR<ParentInfoCreateWithoutProfileInput, ParentInfoUncheckedCreateWithoutProfileInput>
    where?: ParentInfoWhereInput
  }

  export type ParentInfoUpdateToOneWithWhereWithoutProfileInput = {
    where?: ParentInfoWhereInput
    data: XOR<ParentInfoUpdateWithoutProfileInput, ParentInfoUncheckedUpdateWithoutProfileInput>
  }

  export type ParentInfoUpdateWithoutProfileInput = {
    fatherName?: StringFieldUpdateOperationsInput | string
    motherName?: StringFieldUpdateOperationsInput | string
    fatherNative?: StringFieldUpdateOperationsInput | string
    motherNative?: StringFieldUpdateOperationsInput | string
    fatherProfession?: StringFieldUpdateOperationsInput | string
    motherProfession?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    brothers?: IntFieldUpdateOperationsInput | number
    elderBrothers?: IntFieldUpdateOperationsInput | number
    youngerBrothers?: IntFieldUpdateOperationsInput | number
    marriedBrothers?: IntFieldUpdateOperationsInput | number
    sisters?: IntFieldUpdateOperationsInput | number
    elderSisters?: IntFieldUpdateOperationsInput | number
    youngerSisters?: IntFieldUpdateOperationsInput | number
    marriedSisters?: IntFieldUpdateOperationsInput | number
  }

  export type ParentInfoUncheckedUpdateWithoutProfileInput = {
    id?: IntFieldUpdateOperationsInput | number
    fatherName?: StringFieldUpdateOperationsInput | string
    motherName?: StringFieldUpdateOperationsInput | string
    fatherNative?: StringFieldUpdateOperationsInput | string
    motherNative?: StringFieldUpdateOperationsInput | string
    fatherProfession?: StringFieldUpdateOperationsInput | string
    motherProfession?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    brothers?: IntFieldUpdateOperationsInput | number
    elderBrothers?: IntFieldUpdateOperationsInput | number
    youngerBrothers?: IntFieldUpdateOperationsInput | number
    marriedBrothers?: IntFieldUpdateOperationsInput | number
    sisters?: IntFieldUpdateOperationsInput | number
    elderSisters?: IntFieldUpdateOperationsInput | number
    youngerSisters?: IntFieldUpdateOperationsInput | number
    marriedSisters?: IntFieldUpdateOperationsInput | number
  }

  export type HoroscopeProfileUpsertWithoutProfileInput = {
    update: XOR<HoroscopeProfileUpdateWithoutProfileInput, HoroscopeProfileUncheckedUpdateWithoutProfileInput>
    create: XOR<HoroscopeProfileCreateWithoutProfileInput, HoroscopeProfileUncheckedCreateWithoutProfileInput>
    where?: HoroscopeProfileWhereInput
  }

  export type HoroscopeProfileUpdateToOneWithWhereWithoutProfileInput = {
    where?: HoroscopeProfileWhereInput
    data: XOR<HoroscopeProfileUpdateWithoutProfileInput, HoroscopeProfileUncheckedUpdateWithoutProfileInput>
  }

  export type HoroscopeProfileUpdateWithoutProfileInput = {
    zodiacSign?: StringFieldUpdateOperationsInput | string
    tamilYear?: StringFieldUpdateOperationsInput | string
    tamilMonth?: StringFieldUpdateOperationsInput | string
    udayathiNatchat?: StringFieldUpdateOperationsInput | string
    day?: StringFieldUpdateOperationsInput | string
    birthTime?: StringFieldUpdateOperationsInput | string
    starFoot?: StringFieldUpdateOperationsInput | string
    ascendant?: StringFieldUpdateOperationsInput | string
    birthplace?: StringFieldUpdateOperationsInput | string
    natalDirection?: StringFieldUpdateOperationsInput | string
    horoscopeDocuments?: NullableJsonNullValueInput | InputJsonValue
  }

  export type HoroscopeProfileUncheckedUpdateWithoutProfileInput = {
    id?: IntFieldUpdateOperationsInput | number
    zodiacSign?: StringFieldUpdateOperationsInput | string
    tamilYear?: StringFieldUpdateOperationsInput | string
    tamilMonth?: StringFieldUpdateOperationsInput | string
    udayathiNatchat?: StringFieldUpdateOperationsInput | string
    day?: StringFieldUpdateOperationsInput | string
    birthTime?: StringFieldUpdateOperationsInput | string
    starFoot?: StringFieldUpdateOperationsInput | string
    ascendant?: StringFieldUpdateOperationsInput | string
    birthplace?: StringFieldUpdateOperationsInput | string
    natalDirection?: StringFieldUpdateOperationsInput | string
    horoscopeDocuments?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ProfileCreateWithoutUserProfileInput = {
    firstName: string
    lastName: string
    age?: number | null
    regNo: string
    liked?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProfileInput
    parentInfo?: ParentInfoCreateNestedOneWithoutProfileInput
    horoscopeProfile?: HoroscopeProfileCreateNestedOneWithoutProfileInput
  }

  export type ProfileUncheckedCreateWithoutUserProfileInput = {
    id?: number
    userId: number
    firstName: string
    lastName: string
    age?: number | null
    regNo: string
    liked?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    parentInfo?: ParentInfoUncheckedCreateNestedOneWithoutProfileInput
    horoscopeProfile?: HoroscopeProfileUncheckedCreateNestedOneWithoutProfileInput
  }

  export type ProfileCreateOrConnectWithoutUserProfileInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutUserProfileInput, ProfileUncheckedCreateWithoutUserProfileInput>
  }

  export type ProfileUpsertWithoutUserProfileInput = {
    update: XOR<ProfileUpdateWithoutUserProfileInput, ProfileUncheckedUpdateWithoutUserProfileInput>
    create: XOR<ProfileCreateWithoutUserProfileInput, ProfileUncheckedCreateWithoutUserProfileInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutUserProfileInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutUserProfileInput, ProfileUncheckedUpdateWithoutUserProfileInput>
  }

  export type ProfileUpdateWithoutUserProfileInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    regNo?: StringFieldUpdateOperationsInput | string
    liked?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProfileNestedInput
    parentInfo?: ParentInfoUpdateOneWithoutProfileNestedInput
    horoscopeProfile?: HoroscopeProfileUpdateOneWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateWithoutUserProfileInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    regNo?: StringFieldUpdateOperationsInput | string
    liked?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentInfo?: ParentInfoUncheckedUpdateOneWithoutProfileNestedInput
    horoscopeProfile?: HoroscopeProfileUncheckedUpdateOneWithoutProfileNestedInput
  }

  export type ProfileCreateWithoutParentInfoInput = {
    firstName: string
    lastName: string
    age?: number | null
    regNo: string
    liked?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProfileInput
    userProfile?: UserProfileCreateNestedOneWithoutProfileInput
    horoscopeProfile?: HoroscopeProfileCreateNestedOneWithoutProfileInput
  }

  export type ProfileUncheckedCreateWithoutParentInfoInput = {
    id?: number
    userId: number
    firstName: string
    lastName: string
    age?: number | null
    regNo: string
    liked?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userProfile?: UserProfileUncheckedCreateNestedOneWithoutProfileInput
    horoscopeProfile?: HoroscopeProfileUncheckedCreateNestedOneWithoutProfileInput
  }

  export type ProfileCreateOrConnectWithoutParentInfoInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutParentInfoInput, ProfileUncheckedCreateWithoutParentInfoInput>
  }

  export type ProfileUpsertWithoutParentInfoInput = {
    update: XOR<ProfileUpdateWithoutParentInfoInput, ProfileUncheckedUpdateWithoutParentInfoInput>
    create: XOR<ProfileCreateWithoutParentInfoInput, ProfileUncheckedCreateWithoutParentInfoInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutParentInfoInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutParentInfoInput, ProfileUncheckedUpdateWithoutParentInfoInput>
  }

  export type ProfileUpdateWithoutParentInfoInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    regNo?: StringFieldUpdateOperationsInput | string
    liked?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProfileNestedInput
    userProfile?: UserProfileUpdateOneWithoutProfileNestedInput
    horoscopeProfile?: HoroscopeProfileUpdateOneWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateWithoutParentInfoInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    regNo?: StringFieldUpdateOperationsInput | string
    liked?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userProfile?: UserProfileUncheckedUpdateOneWithoutProfileNestedInput
    horoscopeProfile?: HoroscopeProfileUncheckedUpdateOneWithoutProfileNestedInput
  }

  export type ProfileCreateWithoutHoroscopeProfileInput = {
    firstName: string
    lastName: string
    age?: number | null
    regNo: string
    liked?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProfileInput
    userProfile?: UserProfileCreateNestedOneWithoutProfileInput
    parentInfo?: ParentInfoCreateNestedOneWithoutProfileInput
  }

  export type ProfileUncheckedCreateWithoutHoroscopeProfileInput = {
    id?: number
    userId: number
    firstName: string
    lastName: string
    age?: number | null
    regNo: string
    liked?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userProfile?: UserProfileUncheckedCreateNestedOneWithoutProfileInput
    parentInfo?: ParentInfoUncheckedCreateNestedOneWithoutProfileInput
  }

  export type ProfileCreateOrConnectWithoutHoroscopeProfileInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutHoroscopeProfileInput, ProfileUncheckedCreateWithoutHoroscopeProfileInput>
  }

  export type ProfileUpsertWithoutHoroscopeProfileInput = {
    update: XOR<ProfileUpdateWithoutHoroscopeProfileInput, ProfileUncheckedUpdateWithoutHoroscopeProfileInput>
    create: XOR<ProfileCreateWithoutHoroscopeProfileInput, ProfileUncheckedCreateWithoutHoroscopeProfileInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutHoroscopeProfileInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutHoroscopeProfileInput, ProfileUncheckedUpdateWithoutHoroscopeProfileInput>
  }

  export type ProfileUpdateWithoutHoroscopeProfileInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    regNo?: StringFieldUpdateOperationsInput | string
    liked?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProfileNestedInput
    userProfile?: UserProfileUpdateOneWithoutProfileNestedInput
    parentInfo?: ParentInfoUpdateOneWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateWithoutHoroscopeProfileInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    regNo?: StringFieldUpdateOperationsInput | string
    liked?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userProfile?: UserProfileUncheckedUpdateOneWithoutProfileNestedInput
    parentInfo?: ParentInfoUncheckedUpdateOneWithoutProfileNestedInput
  }

  export type UserCreateWithoutProfileViewsInput = {
    email: string
    password: string
    firstName: string
    lastName: string
    isActive?: boolean
    credits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProfileViewsInput = {
    id?: number
    email: string
    password: string
    firstName: string
    lastName: string
    isActive?: boolean
    credits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProfileViewsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProfileViewsInput, UserUncheckedCreateWithoutProfileViewsInput>
  }

  export type UserUpsertWithoutProfileViewsInput = {
    update: XOR<UserUpdateWithoutProfileViewsInput, UserUncheckedUpdateWithoutProfileViewsInput>
    create: XOR<UserCreateWithoutProfileViewsInput, UserUncheckedCreateWithoutProfileViewsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProfileViewsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProfileViewsInput, UserUncheckedUpdateWithoutProfileViewsInput>
  }

  export type UserUpdateWithoutProfileViewsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    credits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProfileViewsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    credits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
  }

  export type ProfileViewCreateManyUserInput = {
    id?: number
    profileId: number
    viewedAt?: Date | string
  }

  export type ProfileViewUpdateWithoutUserInput = {
    profileId?: IntFieldUpdateOperationsInput | number
    viewedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileViewUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    profileId?: IntFieldUpdateOperationsInput | number
    viewedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileViewUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    profileId?: IntFieldUpdateOperationsInput | number
    viewedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}