export class CreateEventDto {
  readonly title: string;
  readonly start: Date;
  readonly end: Date;
  readonly place: string;
  readonly address: string;
  readonly description: string;
}
