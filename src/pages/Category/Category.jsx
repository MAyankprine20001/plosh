import React, { useEffect, useState } from 'react'
import styles from "./Category.module.scss"
import french from "../../../public/french.png"
import indian from "../../../public/indian.png"
import chinese from "../../../public/chinese.png"
import italian from "../../../public/italian.png"
import mexican from "../../../public/mexican.png"
import lebanese from "../../../public/lebanese.png"
import Caribean from "../../../public/caribean.png"
import korean from "../../../public/korean.png"
import {categoryList} from "../../AxiosWork/AxiosApi"




const Categories = () => {
    const [categoryData,setCategoryData] = useState([])
    const [loader,setLoader] = useState(false)
    


    const imagearray = [
        {imgSrc: french },
        {imgSrc: indian },
        {imgSrc: chinese },
        {imgSrc: italian },
        {imgSrc: mexican },
        {imgSrc: lebanese },
        {imgSrc: Caribean },
        {imgSrc: korean },
        {imgSrc: chinese }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoader(true)
                const response = await categoryList();
                console.log(response , "response api of category");
                setCategoryData(response.data);
            } catch (error) {
                console.log(error);
            }finally{
                setLoader(false)
            }
        };
        fetchData();
    }, [])
    
    
  return (
    <div className={styles.categoriespage}>
        {
         loader===true ? <div className={styles.loader} >
         </div>
         :
        
        <div className={styles.CategoryContainer}>
            <p className={styles.heading}>Categories</p>
            <div className={styles.categorySectionContainer}>
                {categoryData.map((category, index) => {
                    const imageIndex = index % imagearray.length;
                    return (
                        <div key={index} className={styles.category} >
                            <div className={styles.imgbox}>
                                <img src={imagearray[imageIndex].imgSrc} alt={category.name} className={styles.img}/>
                                <div className={styles.view}>View</div>
                            </div>
                            <div className={styles.categoryname}>{category.name}</div>
                        </div>
                    );
                })}
            </div>
        </div>
        }
    </div>
  )
}

export default Categories