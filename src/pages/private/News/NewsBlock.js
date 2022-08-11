import React, { useState, useMemo } from 'react'
import { Row, Col, Button } from 'reactstrap'
import Lightbox from 'react-image-lightbox'
import { useSelector } from 'react-redux'
import MyViewElement from 'src/components/MyViewElements/MyViewElements'

function NewsBlock() {
  const [isOpen, setIsOpen] = useState(false)
  const blocks = useSelector((state) => state.news.block)

  const lastWeekNews = useMemo(
    () => (blocks && blocks.week[blocks.week.length - 1]) || null,
    [blocks],
  )

  const lastDayNews = useMemo(() => (blocks && blocks.day[blocks.day.length - 1]) || null, [blocks])

  const imageSrc = useMemo(
    () => lastWeekNews && `${process.env.REACT_APP_BASE_URL}${lastWeekNews.image}`,
    [lastWeekNews],
  )

  const handleOpenPreview = () => setIsOpen(true)

  return (
    <>
    <MyViewElement element={
     <h1 className="root-page-title news-title">Новости</h1>
    }/>
      <div className='news__card'>
        <div className='news__block'>
          {lastWeekNews && (
            <>
               <figure className="news__figure">
            <MyViewElement element={
              <h3 className="news__figure-title">{lastWeekNews.ruTitle}</h3>
            }/>
            <MyViewElement element={
              <div
                className="news__figure-image news__figure-image--pointer"
                onClick={handleOpenPreview}
              >
                <img
                  src={`${process.env.REACT_APP_BASE_URL}${lastWeekNews.image}`}
                  alt={lastWeekNews.ruTitle}
                />
              </div>
            }/>

              <figcaption className="news__figure-body">
              </figcaption>
            </figure>
            <MyViewElement element={
              <Button onClick={handleOpenPreview} color="primary" className='btn-news' outline block>
                Посмотреть
              </Button>
            }/>

            </>
          )}
        </div>
        <div className='news__block'>
          {lastDayNews && (
            <>
             <figure className="news__figure">
            <MyViewElement element={
              <h3 className="news__figure-title">{lastDayNews.ruTitle}</h3>
            }/>
            <MyViewElement element={

              <div className="news__figure-image">
                <img
                  src={`${process.env.REACT_APP_BASE_URL}${lastDayNews.image}`}
                  alt={lastDayNews.ruTitle}
                />
              </div>
            }/>

              <figcaption className="news__figure-body">
                
              </figcaption>
            </figure>
            {lastDayNews.event && lastDayNews.link && (
              <MyViewElement element={
                  <Button tag="a" href={lastDayNews.link}  className='btn-news' target="_blank" color="primary" block>
                    Посетить
                  </Button>
                  }/>
                )}
            </>
          )}
        </div>
      </div>
      {isOpen && (
        <Lightbox
          mainSrc={imageSrc}
          mainSrcThumbnail={imageSrc}
          onCloseRequest={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

export default NewsBlock
