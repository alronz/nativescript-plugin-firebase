/**
 * The allowed values for LoginOptions.type.
 */
export enum LoginType {
  /**
   * No further data is required.
   */
  ANONYMOUS,
  /**
   * This requires you to pass in the 'passwordOptions' as well.
   */
  PASSWORD,
  /**
   * This requires you to add the 'phoneOptions' as well.
   */
  PHONE,
  /**
   * This requires you to pass either an authentication token generated by your backend server
   * or the tokenProviderFn function that returns a promise to provide the token (see 'customOptions').
   * See: https://firebase.google.com/docs/auth/server
   */
  CUSTOM,
  /**
   * This requires you to setup Facebook Auth in the Firebase console,
   * as well as uncommenting the SDK includes in include.gradle (Android) and Podfile (iOS).
   * You can pass in an optional 'facebookOptions' object to override the default scopes.
   */
  FACEBOOK,
  /**
   * This requires you to setup Google Sign In in the Firebase console,
   * as well as uncommenting the SDK includes in include.gradle (Android) and Podfile (iOS).
   * You can pass in an optional 'googleOptions' object to set a 'hostedDomain'.
   */
  GOOGLE,
  /**
   * This requires you to pass in the 'emailLinkOptions' as well.
   * Note that 'Firebase Dynamic Links' must be enabled for this login type to work.
   */
  EMAIL_LINK
}

/**
 * The allowed values for QueryOptions.orderBy.type.
 */
export enum QueryOrderByType {
  KEY,
  VALUE,
  CHILD,
  PRIORITY
}

/**
 * The allowed values for QueryOptions.range.type.
 */
export enum QueryRangeType {
  START_AT,
  END_AT,
  EQUAL_TO
}

/**
 * The allowed values for QueryOptions.limit.type.
 */
export enum QueryLimitType {
  FIRST,
  LAST
}

export enum ServerValue {
  /**
   * When for instance using setValue you can set a timestamp property to this placeholder value.
   * Example:
   *   updateTs: firebase.ServerValue.TIMESTAMP
   */
  TIMESTAMP
}

export interface MessagingOptions {
  /**
   * For Messaging, either pass in this callback function here, or use addOnMessageReceivedCallback.
   */
  onPushTokenReceivedCallback?: (token: string) => void;

  /**
   * For Messaging, either pass in this callback function here, or use addOnPushTokenReceivedCallback.
   */
  onMessageReceivedCallback?: (message: Message) => void;

  /**
   * For Messaging (Push Notifications). Whether you want this plugin to automatically display the notifications or just notify the callback.
   * Currently used on iOS only. Default true.
   */
  showNotifications?: boolean;

  /**
   * For Messaging (Push Notifications). Whether you want this plugin to always handle the notifications when the app is in foreground.
   * Currently used on iOS only. Default false.
   */
  showNotificationsWhenInForeground?: boolean;
}

/**
 * The options object passed into the init function.
 */
export interface InitOptions extends MessagingOptions {
  /**
   * Allow the app to send analytics data to Firebase.
   * Can also be set later with analytics.setAnalyticsCollectionEnabled.
   * Default true.
   */
  analyticsCollectionEnabled?: boolean;
  /**
   * Allow disk persistence. Default true for Firestore, false for regular Firebase DB.
   */
  persist?: boolean;
  /**
   * Get notified when the user is logged in.
   */
  onAuthStateChanged?: (data: AuthStateData) => void;
  /**
   * Attempt to sign out before initializing, useful in case previous
   * project token is cached which leads to following type of error:
   *   "[FirebaseDatabase] Authentication failed: invalid_token ..."
   * Default false.
   */
  iOSEmulatorFlush?: boolean;
  /**
   * For Firebase Storage you can pass in something like 'gs://n-plugin-test.appspot.com'
   * here so we can cache it. Otherwise pass in the 'bucket' param when using Storage features.
   * Can be found in the firebase console.
   */
  storageBucket?: string;

  /**
   * Get notified when a dynamic link was used to launch the app. Alternatively use addOnDynamicLinkReceivedCallback.
   * TODO iOS seems to return an object; not a string
   */
  onDynamicLinkCallback?: (data: DynamicLinkData) => void;
}

export interface QueryRangeOption {
  type: QueryRangeType;
  value: any;
}

/**
 * The options object passed into the query function.
 */
export interface QueryOptions {
  /**
   * How you'd like to sort the query result.
   */
  orderBy: {
    type: QueryOrderByType;
    /**
     * mandatory when type is QueryOrderByType.CHILD
     */
    value?: string;
  };

  /**
   * You can further restrict the returned results by specifying restrictions.
   * Need more than one range restriction? Use 'ranges' instead.
   */
  range?: QueryRangeOption;

  /**
   * Same as 'range', but for a 'chain of ranges'.
   * You can further restrict the returned results by specifying restrictions.
   */
  ranges?: QueryRangeOption[];

  /**
   * You can limit the number of returned rows if you want to.
   */
  limit?: {
    type: QueryLimitType;
    value: number;
  };

  /**
   * Set this to true if you don't want to listen for any future updates,
   * but just want to retrieve the current value.
   * You can also use this to check if certain data is in the database.
   * Default false.
   */
  singleEvent?: boolean;
}

export interface GetAuthTokenOptions {
  /**
   * Default false.
   */
  forceRefresh?: boolean;
}

export interface Provider {
  id: string;
}

export interface FirebasePasswordLoginOptions {
  email: string;
  password: string;
}

export interface FirebaseEmailLinkActionCodeSettings {
  url: string;
  iOS?: {
    bundleId: string;
  };
  android?: {
    packageName: string;
    installApp?: false;
    minimumVersion?: string;
  };
}

export interface FirebaseEmailLinkLoginOptions extends FirebaseEmailLinkActionCodeSettings {
  email: string;
}

export interface FirebasePhoneLoginOptions {
  phoneNumber: string;
  /**
   * The message show to the user that prompts him to enter the received verification code.
   * Default: "Verification code".
   */
  verificationPrompt?: string;
}

export interface FirebaseGoogleLoginOptions {
  hostedDomain?: string;
}

export interface FirebaseFacebookLoginOptions {
  /**
   * Default: ["public_profile", "email"]
   */
  scope?: string[];
}

export interface FirebaseCustomLoginOptions {
  /**
   * The JSON Web Token (JWT) to use for authentication.
   * Either specify this, or 'tokenProviderFn'.
   * See: https://firebase.google.com/docs/auth/server
   */
  token?: string;
  /**
   * A function that returns a promise with the  JSON Web Token (JWT) to use for authentication.
   * Either specify this, or 'token'.
   * See: https://firebase.google.com/docs/auth/server
   */
  tokenProviderFn?: () => Promise<String>;
}

export interface LoginIOSOptions {
  controller?: any;
}

/**
 * The options object passed into the login function.
 */
export interface LoginOptions {
  type: LoginType;
  passwordOptions?: FirebasePasswordLoginOptions;
  emailLinkOptions?: FirebaseEmailLinkLoginOptions;
  phoneOptions?: FirebasePhoneLoginOptions;
  googleOptions?: FirebaseGoogleLoginOptions;
  facebookOptions?: FirebaseFacebookLoginOptions;
  customOptions?: FirebaseCustomLoginOptions;
  ios?: LoginIOSOptions;

  /**
   * @deprecated Please use the 'passwordOptions?: FirebasePasswordLoginOptions' object instead.
   */
  email?: string;
  /**
   * @deprecated Please use the 'passwordOptions?: FirebasePasswordLoginOptions' object instead.
   */
  password?: string;
  /**
   * @deprecated Please use the 'customOptions?: FirebaseCustomLoginOptions' object instead.
   */
  token?: string;
  /**
   * @deprecated Please use the 'customOptions?: FirebaseCustomLoginOptions' object instead.
   */
  tokenProviderFn?: () => Promise<String>;
  /**
   * @deprecated Please use the 'facebookOptions?: FirebaseFacebookLoginOptions' object instead.
   */
  scope?: string[];
}

export interface ReauthenticateOptions {
  type: LoginType;
  passwordOptions?: FirebasePasswordLoginOptions;
  /**
   * @deprecated Please use the 'passwordOptions?: FirebasePasswordLoginOptions' object instead.
   */
  email?: string;
  /**
   * @deprecated Please use the 'passwordOptions?: FirebasePasswordLoginOptions' object instead.
   */
  password?: string;
}

/**
 * The returned object from the login function.
 */
export interface User {
  uid: string;
  email?: string;
  emailVerified: boolean;
  name?: string;
  phoneNumber?: string;
  anonymous: boolean;
  isAnonymous: boolean; // This is used by the web API
  providers: Array<Provider>;
  profileImageURL?: string;
  metadata: UserMetadata;
  additionalUserInfo?: AdditionalUserInfo;
  /** iOS only */
  refreshToken?: string;
}

/**
 * The metadata of the user
 */
export interface UserMetadata {
  creationTimestamp: Date;
  lastSignInTimestamp: Date;
}

/**
 * Contains additional user information
 */
export interface AdditionalUserInfo {
  profile: Map<string, any>;
  providerId: string;
  username: string;
  isNewUser: boolean;
}

/**
 * The returned object from the push function.
 */
export interface PushResult {
  key: string;
}

/**
 * The returned object from the addEventListener functions.
 */
export interface AddEventListenerResult {
  path: string;
  listeners: Array<any>;
}

/**
 * The options object passed into the createUser function.
 */
export interface CreateUserOptions {
  email: string;
  password: string;
}

/**
 * The options object passed into the updateProfile function.
 */
export interface UpdateProfileOptions {
  displayName?: string;
  photoURL?: string;
}

/**
 * The options object passed into the resetPassword function.
 */
export interface ResetPasswordOptions {
  email: string;
}

/**
 * The returned object in the callback handlers
 * of the addChildEventListener and addValueEventListener functions.
 */
export interface FBData {
  type: string;
  key: string;
  value: any;
}

/**
 * The options object passed into the changePassword function.
 */
export interface ChangePasswordOptions {
  email: string;
  oldPassword: string;
  newPassword: string;
}

export interface AuthStateData {
  loggedIn?: boolean;
  user?: User;
}

export interface AuthStateChangeListener {
  onAuthStateChanged: (data: AuthStateData) => void;
  thisArg?: any;
}

export interface RemoteConfigProperty {
  key: string;
  default: any;
}

export interface GetRemoteConfigOptions {
  /**
   * Fetch new results from the server more often.
   * Default false.
   */
  developerMode?: boolean;
  /**
   * The number of seconds before retrieving fresh state from the server.
   * Default 12 hours.
   */
  cacheExpirationSeconds?: number;
  /**
   * The configuration properties to retrieve for your app. Specify as:
   *  properties: [{
   *    key: "holiday_promo_enabled",
   *    default: false
   *  }, ..]
   */
  properties: Array<RemoteConfigProperty>;
}

/**
 * The returned object from the getRemoteConfig function.
 */
export interface GetRemoteConfigResult {
  /**
   * The date the data was last refreshed from the server.
   * Should honor the 'cacheExpirationSeconds' you passed in previously.
   */
  lastFetch: Date;
  /**
   * The result may be throttled when retrieved from the server.
   * Even when the cache has expired. And it's just FYI really.
   */
  throttled: boolean;
  /**
   * A JS Object with properties and values.
   * If you previously requested keys ["foo", "is_enabled"] then this will be like:
   *   properties: {
   *     foo: "bar",
   *     is_enabled: true
   *   }
   */
  properties: Object;
}

export interface DynamicLinkData {
  url: string;
  minimumAppVersion: string;
}

/**
 * The returned object in the callback handler of the addOnMessageReceivedCallback function.
 *
 * Note that any custom data you send from your server will be available as
 * key/value properties on the Message object as well.
 */
export interface Message {
  /**
   * Indicated whether or not the notification was received while the app was in the foreground.
   */
  foreground: boolean;
  /**
   * The main text shown in the notificiation.
   * Not available on Android when the notification was received in the background.
   */
  body?: string;
  /**
   * Optional title, shown above the body in the notification.
   * Not available on Android when the notification was received in the background.
   */
  title?: string;
  /**
   * Any other data you may have added to the notification.
   */
  data: any;
}

export interface SendCrashLogOptions {
  /**
   * Any custom logging you want to send to Firebase.
   */
  message: string;

  /**
   * Also log to the device console. Default false.
   */
  showInConsole: boolean;
}

export function init(options?: InitOptions): Promise<any>;

// Database
export function push(path: string, value: any): Promise<PushResult>;

export function getValue(path: string): Promise<any>;

export function setValue(path: string, value: any): Promise<any>;

export function update(path: string, value: any): Promise<any>;

export function remove(path: string): Promise<any>;

export function query(onValueEvent: (data: FBData) => void, path: string, options: QueryOptions): Promise<any>;

export function addChildEventListener(onChildEvent: (data: FBData) => void, path: string): Promise<AddEventListenerResult>;

export function addValueEventListener(onValueEvent: (data: FBData) => void, path: string): Promise<AddEventListenerResult>;

export function removeEventListeners(listeners: Array<any>, path: string): Promise<any>;

/**
 * Tells the client to keep its local cache in sync with the server automatically.
 */
export function keepInSync(path: string, switchOn: boolean): Promise<any>;

// AdMob module
export namespace admob {

  /**
   * The allowed values for AD_SIZE.
   */
  export enum AD_SIZE {
    SMART_BANNER,
    LARGE_BANNER,
    BANNER,
    MEDIUM_RECTANGLE,
    FULL_BANNER,
    LEADERBOARD
  }

  /**
   * The possible error codes (see https://developers.google.com/android/reference/com/google/android/gms/ads/AdRequest#ERROR_CODE_INTERNAL_ERROR).
   */
  export enum ERROR_CODES {
    ERROR_CODE_INTERNAL_ERROR,
    ERROR_CODE_INVALID_REQUEST,
    ERROR_CODE_NETWORK_ERROR,
    ERROR_CODE_NO_FILL
  }

  export interface ShowBannerOptions {
    /**
     * The layout of the banner.
     * Default AD_SIZE.SMART_BANNER
     */
    size?: AD_SIZE;

    /**
     * When false (default) you'll get real banners.
     */
    testing?: boolean;

    /**
     * Something like "ca-app-pub-AAAAAAAA/BBBBBBB".
     */
    androidBannerId?: string;

    /**
     * Something like "ca-app-pub-XXXXXX/YYYYYY".
     */
    iosBannerId?: string;

    /**
     * If testing is true, the simulator is allowed to receive test banners.
     * Android automatically add the connceted device as test device, but iOS does not.
     * If you also want to test on real devices, add it here like this:
     *   ["ce97330130c9047ce0d4430d37d713b1", ".."]
     */
    iosTestDeviceIds?: string[];

    /**
     * The number of pixels from the top/bottom of the view.
     * The plugin corrects for display density, so don't worry about that.
     *
     * If both are set, top wins.
     */
    margins?: {
      /**
       * Default: -1 (ignored).
       */
      top?: number;

      /**
       * Default: -1 (ignored).
       */
      bottom?: number;
    };

    /**
     * Specify keywords for ad targeting
     */
    keywords?: string[];
  }

  export interface ShowInterstitialOptions {
    /**
     * When false (default) you'll get real banners.
     */
    testing?: boolean;

    /**
     * Something like "ca-app-pub-AAAAAAAA/BBBBBBB".
     */
    androidInterstitialId?: string;

    /**
     * Something like "ca-app-pub-XXXXXX/YYYYYY".
     */
    iosInterstitialId?: string;

    /**
     * If testing is true, the simulator is allowed to receive test banners.
     * Android automatically add the connceted device as test device, but iOS does not.
     * If you also want to test on real devices, add it here like this:
     *   ["ce97330130c9047ce0d4430d37d713b1", ".."]
     */
    iosTestDeviceIds?: string[];
  }

  function showBanner(options: ShowBannerOptions): Promise<any>;

  function showInterstitial(options: ShowInterstitialOptions): Promise<any>;

  function hideBanner(): Promise<any>;
}

// Invites module
export namespace invites {

  export enum MATCH_TYPE {
    WEAK,
    STRONG
  }

  export interface SendInvitationOptions {
    /**
     * Invitation title you want to send.
     */
    title: string;

    /**
     * Sets the default message sent with invitations.
     */
    message: string;

    /**
     * Sets the link into your app that is sent with invitations.
     */
    deepLink?: string;

    /**
     * Sets the call-to-action text of the button rendered in email invitations. Cannot exceed 32 characters.
     */
    callToActionText?: string;

    /**
     * Sets the URL of a custom image to include in email invitations. The image must be square and around 600x600 pixels. The image can be no larger than 4000x4000 pixels.
     */
    customImage?: string;

    /**
     * If you have an Android version of your app and you want to send an invitation that can be opened on Android in addition to iOS.
     */
    androidClientID?: string;

    /**
     * You can find your iOS app's client ID in the GoogleService-Info.plist file you downloaded from the Firebase console.
     */
    iosClientID?: string;
  }

  export interface SendInvitationResult {
    count: number;
    invitationIds: any;
  }

  export interface GetInvitationResult {
    deepLink: string;
    matchType?: MATCH_TYPE;
    invitationId: string;
  }

  function sendInvitation(options: SendInvitationOptions): Promise<SendInvitationResult>;

  function getInvitation(): Promise<GetInvitationResult>;
}

export namespace dynamicLinks {
  export enum MATCH_CONFIDENCE {
    WEAK,
    STRONG
  }

  export interface DynamicLinkCallbackData {
    url: string;
    matchConfidence?: MATCH_CONFIDENCE;
    minimumAppVersion?: string;
  }
}

export namespace firestore {
  export type DocumentData = { [field: string]: any };
  export type WhereFilterOp = '<' | '<=' | '==' | '>=' | '>' | 'array-contains';
  export type OrderByDirection = 'desc' | 'asc';

  export interface GeoPoint {
    longitude: number;
    latitude: number;
  }

  export function GeoPoint(latitude: number, longitude: number): GeoPoint;

  export interface SetOptions {
    merge?: boolean;
  }

  export interface DocumentSnapshot {
    ios?: any; /* FIRDocumentSnapshot */
    android?: any; /* com.google.firebase.firestore.DocumentSnapshot */
    id: string;
    exists: boolean;
    data(): DocumentData;
  }

  export interface DocumentReference {
    discriminator: "docRef";
    id: string;
    collection: (collectionPath: string) => CollectionReference;
    set: (document: any, options?: SetOptions) => Promise<void>;
    get: () => Promise<DocumentSnapshot>;
    update: (document: any) => Promise<void>;
    delete: () => Promise<void>;

    onSnapshot(callback: (doc: DocumentSnapshot) => void): () => void;

    android?: any;
    ios?: any;
  }

  export interface Query {
    get(): Promise<QuerySnapshot>;

    where(fieldPath: string, opStr: WhereFilterOp, value: any): Query;

    orderBy(fieldPath: string, directionStr: firestore.OrderByDirection): Query;

    limit(limit: number): Query;

    onSnapshot(callback: (snapshot: QuerySnapshot) => void): () => void;

    startAt(snapshot: DocumentSnapshot): Query;

    startAfter(snapshot: DocumentSnapshot): Query;

    endAt(snapshot: DocumentSnapshot): Query;

    endBefore(snapshot: DocumentSnapshot): Query;
  }

  export interface CollectionReference extends Query {
    id: string;

    doc(documentPath?: string): DocumentReference;

    add(data: DocumentData): Promise<DocumentReference>;
  }

  export type UpdateData = { [fieldPath: string]: any };

  export class FieldPath {
    /**
     * Creates a FieldPath from the provided field names. If more than one field
     * name is provided, the path will point to a nested field in a document.
     *
     * @param fieldNames A list of field names.
     */
    constructor(...fieldNames: string[]);

    /**
     * Returns a special sentinel FieldPath to refer to the ID of a document.
     * It can be used in queries to sort or filter by the document ID.
     */
    static documentId(): FieldPath;
  }

  export interface Transaction {
    get(documentRef: DocumentReference): DocumentSnapshot;
    set(documentRef: DocumentReference, data: DocumentData, options?: SetOptions): Transaction;
    update(documentRef: DocumentReference, data: UpdateData): Transaction;
    update(documentRef: DocumentReference, field: string | FieldPath, value: any, ...moreFieldsAndValues: any[]): Transaction;
    delete(documentRef: DocumentReference): Transaction;
  }

  export interface WriteBatch {
    set(documentRef: DocumentReference, data: DocumentData, options?: SetOptions): WriteBatch;
    update(documentRef: DocumentReference, data: UpdateData): WriteBatch;
    update(documentRef: DocumentReference, field: string | FieldPath, value: any, ...moreFieldsAndValues: any[]): WriteBatch;
    delete(documentRef: DocumentReference): WriteBatch;
    commit(): Promise<void>;
  }

  export class FieldValue {
    static serverTimestamp: () => "SERVER_TIMESTAMP";
  }

  export interface QuerySnapshot {
    docSnapshots: firestore.DocumentSnapshot[];

    forEach(callback: (result: DocumentSnapshot) => void, thisArg?: any): void;
  }

  function collection(collectionPath: string): CollectionReference;

  function doc(collectionPath: string, documentPath?: string): DocumentReference;

  function add(collectionPath: string, documentData: any): Promise<DocumentReference>;

  function set(collectionPath: string, documentPath: string, document: any, options?: any): Promise<void>;

  function getCollection(collectionPath: string): Promise<QuerySnapshot>;

  function getDocument(collectionPath: string, documentPath: string): Promise<DocumentSnapshot>;

  function update(collectionPath: string, documentPath: string, document: any): Promise<void>;

  function runTransaction(updateFunction: (transaction: firestore.Transaction) => Promise<any>): Promise<void>;

  function batch(): firestore.WriteBatch;
}

// Auth
export function login(options: LoginOptions): Promise<User>;

export function reauthenticate(options: ReauthenticateOptions): Promise<any>;

export function reloadUser(): Promise<void>;

export function getAuthToken(option: GetAuthTokenOptions): Promise<string>;

export function logout(): Promise<any>;

export function fetchProvidersForEmail(email: string): Promise<Array<string>>;

export function fetchSignInMethodsForEmail(email: string): Promise<Array<string>>;

export function sendEmailVerification(): Promise<any>;

export function createUser(options: CreateUserOptions): Promise<User>;

export function deleteUser(): Promise<any>;

export function updateProfile(options: UpdateProfileOptions): Promise<any>;

export function resetPassword(options: ResetPasswordOptions): Promise<any>;

export function changePassword(options: ChangePasswordOptions): Promise<any>;

export function addAuthStateListener(listener: AuthStateChangeListener): boolean;

export function removeAuthStateListener(listener: AuthStateChangeListener): boolean;

export function hasAuthStateListener(listener: AuthStateChangeListener): boolean;

export function getCurrentUser(): Promise<User>;

// Messaging
export function addOnMessageReceivedCallback(onMessageReceived: (data: Message) => void): Promise<any>;

export function addOnPushTokenReceivedCallback(onPushTokenReceived: (data: string) => void): Promise<any>;

export function registerForInteractivePush(model: any): void;

export function getCurrentPushToken(): Promise<string>;

export function registerForPushNotifications(): Promise<void>;

export function unregisterForPushNotifications(): Promise<void>;

export function subscribeToTopic(topicName): Promise<any>;

export function unsubscribeFromTopic(topicName): Promise<any>;

export function areNotificationsEnabled(): boolean;

// dynamic links
export function addOnDynamicLinkReceivedCallback(onDynamicLinkReceived: (callBackData: dynamicLinks.DynamicLinkCallbackData) => void): Promise<any>;

// remote config
export function getRemoteConfig(options: GetRemoteConfigOptions): Promise<GetRemoteConfigResult>;

// crash logging
export function sendCrashLog(options: SendCrashLogOptions): Promise<any>;
