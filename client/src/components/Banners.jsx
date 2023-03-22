import React, {useRef, useEffect} from 'react'
import '../styles/banners.css'
import styled from 'styled-components'
import img1 from '../assets/imagen1.jpg'
import img2 from '../assets/imag2.jpg'
import img3 from '../assets/imag3.jpg'
import izq from '../assets/Izquierda.png'
import der from '../assets/Derecha.png'
import lema from '../assets/lema.png'




const Banners = () => {
    const bannerShow = useRef(null);

    const sgte = ()=>{
        //comprobamos si hay elemento 
        if(bannerShow.current.children.length >0){
            //se obtiene el primer elemento 
            const primerElemnto = bannerShow.current.children[0];
            //transicion para desplazar
            bannerShow.current.style.transition = `300ms ease-out all`;

            const tamañoBanner = bannerShow.current.children[0].offsetWidth;
            //mover imagen 
            bannerShow.current.style.transform = `translateX(-${tamañoBanner}px)`;
            
            const transicion = () => {
                //reinicia la posicion del banner
                bannerShow.current.style.transition = 'none';
                bannerShow.current.style.transform =`translateX(0)`;

                //toma el primer elemento y lo manda al final 
                bannerShow.current.appendChild(primerElemnto);

                bannerShow.current.removeListener('transitionend');
            }
            //EventListener para cuadno termian la animacion
            bannerShow.current.addEventListener('transitionend',transicion)
        }
    }
    const anterior = ()=>{
        console.log('anterior');
        if(bannerShow.current.children.length > 0){
            // se obtiene el uletimo elemento 
            const index = bannerShow.current.children.length -1;
            const ultimoElemto = bannerShow.current.children[index];
            bannerShow.current.insertBefore(ultimoElemto, bannerShow.current.firstChild);

            bannerShow.current.style.transition = 'none';

            const tamañoBanner = bannerShow.current.children[0].offsetWidth;
            bannerShow.current.style.transform = `translateX(-${tamañoBanner}px)`;

            setTimeout(()=>{
                bannerShow.current.style.transition = '300ms ease-out all';
                bannerShow.current.style.transform = `translateX(0)`;
            },30);
        }

    }

    useEffect(()=>{
        const intervalo = setInterval(()=>{
            sgte();
        },5000);
    },[]);
        return (
            <ContenedorPrincipal>
                <ContenedorSlider ref={bannerShow}>
                    <Slider>
                        <a href="https://www.laroche-posay.es/">
                            <img  src={img1} alt="" />
                        </a>
                    </Slider>
                    <Slider>
                        <a href="https://www.colgate.com/es-uy/orthogard">
                            <img src={img2} alt="" />
                        </a>
                    </Slider>
                    <Slider>
                        <a href="https://www.dove.com/py/home.html">
                            <img  src={img3} alt="" />
                        </a>
                     </Slider>
                </ContenedorSlider>
               <Controles>
                <Boton onClick={anterior}>
                    <img src={izq} alt="" />
                </Boton>
                <Boton derecho onClick={sgte}>
                    <img src={der} alt="" />
                </Boton>
               </Controles>
               <div className='footer'>
                 <div>
                   <br /><span> <i className="bi bi-envelope-at"></i> pharmaplus@gmail.com</span> <br />
                    <span><i class="bi bi-telephone"> </i> 071 000 200</span> <br />
                    <span><i class="bi bi-geo-fill"> </i> Encarnacion-Paraguay</span>
                 </div>
                 <div className='lema'>
                    <img src={lema} alt="" />
                 </div>
                 <div className='redes'>
                    <span><i class="bi bi-instagram"></i></span>
                    <span><i class="bi bi-twitter"></i></span>
                    <span><i class="bi bi-facebook"></i></span>
                 </div>
               </div>
            </ContenedorPrincipal>
            
        )
}
const ContenedorPrincipal = styled.div`
        position: relative;
        margin-top:100px;
`;
const ContenedorSlider = styled.div`
        display:flex;
        flex-wrap:nowrap;
`;
const Slider = styled.div`
    min-width: 100%;
    overflow: hidden;
    transition: .3s ease all;
    z-index: 10;
    /* max-height: 500px; */
    position: relative;
    img {
        width: 100%;
        vertical-align: top;
}
`;

const Controles = styled.div`
	position: absolute;
	top: 0;
	z-index: 20;
	width: 100%;
	height: 100%;
	pointer-events: none;
`;
const Boton = styled.button`
	pointer-events: all;
	background: none;
	border: none;
	cursor: pointer;
	outline: none;
	width: 50px;
	height: 100%;
	text-align: center;
	position: absolute;
	transition: .3s ease all;
	 &:hover {
		background: rgba{0,0,0,.2)}
		path {
			fill: #fff;
		}
	} 
	path {
		filter: ${props => props.derecho ? 'drop-shadow(-2px 0px 0px #fff)' : 'drop-shadow(2px 0px 0px #fff)'};
	}
	${props => props.derecho ? 'right: 0' : 'left: 0'}
`;

export default Banners;
