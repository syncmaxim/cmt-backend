import { Document } from 'mongoose';
import {IEvent} from './event.interface';

export interface IUser extends Document {
    email: string;
    password: string;
    events?: IEvent[];
    eventsToAttend?: IEvent[]
}
