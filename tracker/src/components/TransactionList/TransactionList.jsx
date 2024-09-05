
import TransactionCard from '../TransactionCard/TransactionCard';
import styles from './TransactionList.module.css';
import Expenseform from '../Forms/ExpenseForm/Expenseform';
import Modal from './Model/Modal';
import {useEffect, useState} from 'react'
import Pagination from '../Pagination/Pagination';

    export default function TransactionList({transactions, title, editTransactions, balance, setBalance})
    {
    const [editid, setEditId]= useState(0);
    const [isDisplayEditor, setIsDisplayEditor]= useState(false);
    const [currentTransactions, setCurrentTransactions]= useState([]);
    const [currentPage, setCurrentPage]= useState(1);
    const maxRecords = 3;
    const [totalPages, setTotalPages]=useState(0);

    const handledelete=(id)=>{
        
    const item=transactions.find(i=>i.id==id);
    const price=Number(item.price);
    setBalance(prev=>prev+price);

    editTransactions(prev=> ( 
        prev.filter(item=>item.id!=id)
        ))
    }

    const handleEdit=(id)=> {
        const item=transactions.find(i=>i.id==id);
        const price=Number(item.price);
        setBalance(prev=>prev+price);
        
        editTransactions(prev=> ( 
            prev.filter(item=>item.id!=id)
            ))
    }

    const handleEdit = (id) => {
       setEditId(id);
       setIsDisplayEditor(true);
    }

        useEffect(()=>{
    const startIndex = (currentPage1)*maxRecords;
    const endIndex=Math.min(currentPage*maxRecords, transactions. length);
    setCurrentTransactions([...transactions].slice(startIndex, endIndex));
    setTotalPages (Math.ceil(transactions.length/maxRecords)
         ),[currentPage, transactions]);

    useEffect(()=>{
     if(totalPages<currentPage && currentPage>1){
        setCurrentPage(prev=>prev-1);
     }
    },[totalPages])

    return (
        <div className={styles.transactionsWrapper}>

        {title && <h2>{title}</h2>}
        {transactions.length > 0 ?
        <div className={styles.list}>
        <div>
        {currentTransactions.map(transaction => (
        <TransactionCard
        details={transaction}
        key={transaction.id}
        handleDelete={() => handleDelete(transaction.id)}
        handleEdit={()=>handleEdit(transaction.id)}
        />
        
        </div>

    {totalPages>1 && (<Pagination updatePage={setCurrentPage}currentPage={currentPage} totalPages={totalPages}/>)}
    </div>:(
  <div className={styles.emptyTransactionsWrapper}>
  <p>No transactions!</p>
  </div>
    )
}
