/**
 * Interface representing a user.
 * @interface Profile
 */
export interface Profile {
    _id: string,
    email: string;
    isAdmin: boolean;
    username: string;
    coordinates: Array<number>;
    emailReminderPreference: string;
}