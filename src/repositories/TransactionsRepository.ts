import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface CreateTransactionDTO{
  title:string;
  value:number;
  type:'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {

    return this.transactions;
  }

  public getBalance(){
   const transactions = this.transactions;
   const reducer = (accumulator:any, currentValue: any) =>{
    return accumulator + currentValue;}

    function arrayConverter(type:"outcome"|"income",transaction:Transaction[]){
      const arr = transaction.map(transaction=>{
        if(transaction.type==type){
          return transaction.value;
          }else{
          return 0
            }})
        return arr;}

      const arrayIncome = arrayConverter("income",transactions)
      const arrayOutcome = arrayConverter("outcome",transactions)
      const income = arrayIncome.reduce(reducer);
      const outcome = arrayOutcome.reduce(reducer);
      const total = income-outcome;


  return ({income,outcome,total});

}


  public create({title,value,type}:CreateTransactionDTO):Transaction{
    if(!this.all()[0]){
      if(type=="outcome"){
        throw Error("Saldo insuficiente")}

      const transaction = new Transaction({title,value,type});
      this.transactions.push(transaction);
      return transaction;
    }

    const balance = this.getBalance();
      if(type=="outcome" && (balance.total-value<0)){
        throw Error("Saldo insuficiente")
      }
      else{
    const transaction = new Transaction({title,value,type});
        this.transactions.push(transaction);
        return transaction;}




}}

export default TransactionsRepository;
