import Image from "next/image";
import styles from "../styles/home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import LOGO from '../styles/icons/logo.png'
import SELL from '../styles/icons/sell.png'

axios.post('https://mind-tide.vercel.app/api').then((res) => console.log(res.data.msg))

export default function Home() {

  const [products,setProducts] = useState([])

  const router = useRouter()

  const fetch_Products = async()=>{
    const result = await axios.get('https://mind-tide.vercel.app/api/fetchProducts')
    if(result.status === 200){
      setProducts(result.data.products)
    }
    else if(result.data.status === 404){
      alert(result.data.msg)
    }
  }

  useEffect(()=>{
    fetch_Products()
  },[])

  const takeToSell = ()=>{
    router.push('/sellProduct')
  }

  return (
    <div className={styles.container}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Image src={LOGO} alt='Logo' width={100} height={100} />
        </div>
        <div style={{marginLeft: 'auto', marginRight: '20px', cursor: 'pointer'}}>
          <Image src={SELL} alt='Logo' width={70} height={70} onClick={takeToSell}/>
        </div>
      </nav>

      {/* Products */}
      <div className={styles.products}>
        {products.map((product,ind) => (
          <div key={ind} className={styles.product_card}>
            <Image src={product.thumbnail} alt={product.thumbnail} width={200} height={200} />
            <div className={styles.product}>
              <h3 style={{marginRight: 'auto'}}>{product.name}</h3>
              <p>₹{product.price}</p>
            </div>
            <div style={{marginTop: '20px'}}>
            <Link
              href={{ pathname: '/products', query: { id: product._id } }}
              className={styles.viewButton}
            >
              View Details
            </Link>
            </div>
          </div>
        ))}        
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2024 E-Commerce. All rights reserved.</p>
      </footer>
    </div>
  );
}