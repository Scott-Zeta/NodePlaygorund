// store types application needs

export type Message = {
  body: string;
};

export type User = {
  name: string;
  messages: Message[];
};
