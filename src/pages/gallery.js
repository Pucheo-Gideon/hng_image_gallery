import React, { useRef, useState } from "react"
import { Fragment } from "react"
import styles from "../styles/auth.module.css"
// import { signOut } from "firebase/auth"
import {auth} from "../firebase/config"
import { useRouter } from "next/router"
import styled from "../styles/gallery.module.css"
import PrivateRoute from "@/library/privateRoute"
import Image from "next/image"
import Loader from "./loading"
import { Suspense } from "react"

export default function ImageGallery(){

    const router = useRouter()

    const Logout = async () => {
        try{
            await auth.signOut()
            router.push('/auth')

        }catch(error){
            console.error("Error signing out: ", error)
        }
    }

    const [search, setSearch]= useState("")
    const [draggingMessage, setDraggingMessage] = useState(false);

    console.log(search)

    const handleOnSearch = (e)=> {
        setSearch(e.target.value)
    }

    // function searchFilter(result){
    //     const searchResult =result.map(item =>{
            
    //     })
    // }

    // const timeId = setTimeout(()=> {
    //     setSearch("")
    // },3000)

    const [imageLists, setImageList] = useState([
        {img: "/books.jpeg", tag: "book"},
        {img: "/car1.jpeg", tag: "car"},
        {img:"/heart.jpg", tag: "heart"},
        {img: "/car2.jpeg", tag: "car"},
        {img: "/peacock.jpeg", tag: "peacock"},
        {img: "/phone1.jpeg", tag: "phone"},
        {img:"/cars3.jpeg", tag: "car"},
        {img: "/tiger.jpeg", tag: "tiger"},
        {img: "/flower.jpeg", tag: "flower"},
        {img: "/scenery.jpeg", tag: "scenery"}
    ])
       
    
    // Point to and hold dragged item position
      const dragItem = useRef();
    const dragOverItem = useRef()

      const dragStart = (e, position) => {
        dragItem.current = position;
        setDraggingMessage(true);
      };

    const dragEnter = (e, position) =>{
        dragOverItem.current = position
        console.log(e.target.innerHTML)
    }

    const drop = (e) => {
        const copyImages = [...imageLists]
        const dragImageContent = copyImages[dragItem.current]
        copyImages.splice(dragItem.current, 1);
        copyImages.splice(dragOverItem.current, 0, dragImageContent)
        dragItem.current = null;
        dragOverItem.current = null;
        setImageList(copyImages)
        setDraggingMessage(false);
    }   

    const loopImages = imageLists && imageLists
    .filter(item => {
        return search.toLowerCase() === "" ? item:  item.tag.toLowerCase().includes(search)
    }).map((image, index)=> {
       return (
      
           <div
             key={index}
             className={styled.photo}
             draggable
             onDragStart={(e) => dragStart(e, index)}
             onDragEnter={(e) => dragEnter(e, index)}
             onDragEnd={drop}
           >
             <Image
               src={image.img}
               alt={"img" + index}
               width={229}
               height={200}
               priority={true}
             />
             <p>{image.tag}</p>
           </div>
       );
    })

    // Add this functionality later
    let [showMessage, setShowMessage] = useState(false)
        
    return (
      <PrivateRoute>
        <React.Fragment>
          <nav className={styled.navbar}>
            <h1 className={styled.greeting}>Welcome!</h1>
            <input
              type="search"
              placeholder="Search your here...."
              className={styled.search}
              name="search"
              onChange={handleOnSearch}
            />
            <button className={styled.btn} onClick={Logout}>
              Sign Out
            </button>
          </nav>
         
          {draggingMessage && (
            <div className={styled.drag_message}>Dragging image...</div>
          )}
          <section className={styled.image_container}>
            <Suspense fallback={<Loader />}>{loopImages}</Suspense>
          </section>
          n
        </React.Fragment>
      </PrivateRoute>
    );
} 