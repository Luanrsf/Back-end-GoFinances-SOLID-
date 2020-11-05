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
   const reducer = (total:number, value: number) =>{
    return total + value;}

    function arrayConverter(type:"outcome"|"income"){
      const arr = transactions.map(transaction=>{
        if(transaction.type==type){
          return transaction.value;
          }else{
          return 0
            }})
        return arr;}



      const arrayIncome = arrayConverter("income")
      const arrayOutcome = arrayConverter("outcome")
      const income = arrayIncome.reduce(reducer);
      const outcome = arrayOutcome.reduce(reducer);
      const total = income-outcome;


  return ({income,outcome,total});

}


  public create({title,value,type}:CreateTransactionDTO):Transaction{
    if(!this.all()[0]){
      if(type=="outcome"){
        throw Error("insuficent balance")}

      const transaction = new Transaction({title,value,type});
      this.transactions.push(transaction);
      return transaction;
    }

    const balance = this.getBalance();
      if(type=="outcome" && (balance.total-value<0)){
        throw Error("insufficient funds");
      }
      else{
    const transaction = new Transaction({title,value,type});
        this.transactions.push(transaction);
        return transaction;}




}}

export default TransactionsRepository;
