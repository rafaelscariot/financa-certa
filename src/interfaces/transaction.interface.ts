export default interface Transaction {
  date: Date;
  key?: string;
  type: string;
  value: string;
  category: string;
  description: string;
}
