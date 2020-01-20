export class CreateEventDto {
  readonly title: string;
  readonly start: Date;
  readonly end: Date;
  readonly place: string;
  readonly address: string;
  readonly description: string;
  readonly speakers: {
    readonly fullName: string;
    readonly presentationTitle: string;
    readonly from: string;
    readonly company: string;
  }
}
