import styled from "../styles/gallery.module.css"

export default function Loader (){

    return 
    <div className={styled.loader_container}>
        <div className={styled.loader}></div>
    </div>
}