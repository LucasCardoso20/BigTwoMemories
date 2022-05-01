import React, {useState, useEffect} from 'react'
import {urlFor, client} from './client'
import logo from './assets/bigtwo.png';
import './App.scss';
import './gallery.scss'
import { data } from './assets/data';

function App() {
  const [activeFilter, setActiveFilter] = useState('Todos')
  const [content, setContent] = useState([])
  const [filterContent, setFilterContent] = useState([])
  const [toggle, setToggle] = useState(false)

    useEffect(() => {
      const query = '*[_type == "content"]'

      client.fetch(query)
        .then((data)=> {
            setContent(data)
            setFilterContent(content.filter((content)=> content.tags.includes('Todos')))             
            setFilterContent(data)
            
        })
    }, [])

    const handleContentFilter = (item) => {
      setActiveFilter(item)

      setTimeout(() => {
        setFilterContent(content.filter((content)=> content.tags.includes(item)))    
      }, 500);
    }


  return (
    <>
    <header className="header">
      

      <div className='nav__container'>
        

        <div className='logo'><img src={logo} className="logo__img"/></div>    

        <ul className='nav__list'>
        {data.map((item, index)=> (
          <>
            <li 
              key={index}
              onClick={()=> handleContentFilter(item.categoryName)}
              className={`nav__item ${activeFilter === item.categoryName ? 'active_item' : ''}`}
            >
              {item.categoryName}
            </li>
          </>
          ))}
        </ul>


        {/* mobile menu */}

        <nav className="nav">
          <button className="toggle-menu" onClick={()=> setToggle(!toggle)}>
            <span></span>
          </button>
        </nav>

        <div id="menu" className={`${toggle ? 'open' : ''}`}>
          <nav className="main-nav">
            <ul>
              {data.map((item, index)=> (
                <li key={index} onClick={()=> handleContentFilter(item.categoryName)}>
                  <a href="#" onClick={()=> setToggle(false)}>
                    {item.categoryName}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
  
          <footer className="menu-footer">
            <nav className="footer-nav">
              <ul>
                <li>
                  <a href="https://www.youtube.com/">
                  <i className="fa-brands fa-youtube"></i>
                    Youtube
                  </a>
                </li>
                <li>
                  <a href="https://br.pinterest.com/marianasifonte/nossa-cole%C3%A7%C3%A3o-interna/">
                    <i className="fa fa-envelope fa-fw"></i>
                    Pinterest
                  </a>
                </li>
              </ul>
            </nav>
          </footer>
        </div>
        {/* End of the mobile menu */}

      </div>
    </header>
    
    {/* Gallery */}
    <section>
      <div className="projects__images__container">
        {filterContent.map((content, index)=> (
          <div className="card" key={index}>
            <div className="card-header">
              <a href={content.contentLink}>
                <img src={urlFor(content.imgUrl)} alt={content.title} />
              </a>
            </div>
            <div className="card-body">
              <div className='card__code'>
                {content.tags.map((tag)=> {
                  return <span className=
                  {`tag ${tag === 'Filmes' && 'tag-purple'} 
                  ${tag === 'Todos' && 'tag-pink'}
                  ${tag === 'Já assistimos' && 'tag-green'}
                  `}         
                  >{tag}
                  </span>
                  })}              
              </div>
              <h2>
                {content.title}
              </h2>
              <p>
                {content.description}
              </p>
            </div>
          </div>  
            ))}
      </div>
    </section>

    </>
  );
}

export default App;
