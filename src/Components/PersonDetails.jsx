import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadPersonAction, removePerson } from '../store/actions/personActions';
import { useNavigate, useParams } from 'react-router-dom';
import noimage from '../assets/no-img.jpg';
import Loader from './Loader';
import HorizontalData from './partials/HorizontalData';

const PeopleDetails = () => {

  const { id } = useParams();
  const personData = useSelector((state) => state.person.info);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  var utc = new Date().toJSON().slice(0,10).replace(/-/g,'-');
  //console.log(personData);

  useEffect(()=>{
    dispatch(loadPersonAction(id));

    return () => {
      dispatch(removePerson());
    }
  }, [id])
  return personData ? (
    <div className='w-full h-screen overflow-y-auto relative'>
      {/* Part 1 - Navigation */}
      <div className='w-full h-[9vh] sm:h-[13vh] flex items-center px-[2%]'>
        <div className="back-home-wrapper w-full flex sm:gap-6 gap-4 sm:text-2xl text-3xl justify-between">
          <button onClick={()=>navigate(-1)} className='text-[#fff] px-3 py-2 font-semibold rounded-[50%] hover:bg-[#303030] duration-300'><i className="ri-arrow-left-line"></i></button>
          <button onClick={()=>navigate('/')} className='text-[#fff] px-3 py-2 font-semibold rounded-[50%] hover:bg-[#303030] duration-300'><i className="ri-home-line"></i></button>
        </div>
      </div>

      {/* Part 2 - Person Details */}
      <div className="main-wrapper w-full px-8 sm:px-[4%] h-fit flex gap-8 sm:py-10 py-5 flex-col sm:flex-row">

        {/* Left Part */}
        <div className="left min-h-[50vh] sm:w-[25%] flex flex-col gap-4 sm:gap-8">
          <img className="object-cover rounded-lg px-14 sm:px-0" src={personData.detail.profile_path ? `https://image.tmdb.org/t/p/w500/${personData.detail?.profile_path}` : noimage} alt="" />
          <div className="links flex gap-8 text-white sm:text-2xl text-4xl justify-center sm:justify-start">
            {personData.externalId.facebook_id && <a href={`https://www.facebook.com/${personData.externalId.facebook_id}`} target='_blank'><i className='font-serif hover:text-yellow-300 duration-200 ri-facebook-circle-fill'></i></a>}
            {personData.externalId.instagram_id && <a href={`https://www.instagram.com/${personData.externalId.instagram_id}`} target='_blank'><i className='font-serif hover:text-yellow-300 duration-200 ri-instagram-fill'></i></a>}
            {personData.externalId.twitter_id && <a href={`https://www.twitter.com/${personData.externalId.twitter_id}`} target='_blank'><i className='font-serif hover:text-yellow-300 duration-200 ri-twitter-x-fill'></i></a>}
            {personData.externalId.wikidata_id && <a href={`https://www.wikidata.org/wiki/${personData.externalId.wikidata_id}`} target='_blank'><i className='font-serif hover:text-yellow-300 duration-200 '>W</i></a>}
          </div>
          <div className="personal-detail-wrapper flex flex-col gap-4">
            <h1 className='text-5xl sm:text-3xl text-white '>Personal Info</h1>
            {
              personData.detail.known_for_department && <div className="detail-wrapper text-white">
                <h3 className='text-3xl sm:text-xl'>Known For</h3>
                <p className='text-xl sm:text-lg font-extralight'>{personData.detail.known_for_department}</p>
              </div>
            }
            {
              personData.detail.gender && <div className="detail-wrapper text-white">
                <h3 className='text-3xl sm:text-xl'>Gender</h3>
                <p className='text-xl sm:text-lg font-extralight'>{personData.detail.gender === 0 ? "Not Set" : personData.detail.gender === 1 ? "Female" : personData.detail.gender === 2 ? "Male" : "Non-Binary"}</p>
              </div>
            }
            {
              personData.detail.birthday && <div className="detail-wrapper text-white">
                <h3 className='text-3xl sm:text-xl'>Birthday</h3>
                <p className='text-xl sm:text-lg font-extralight'>{`${personData.detail.birthday} (${(Number(utc.slice(8, 10)) >= Number(personData.detail.birthday.slice(8, 10))) && (Number(utc.slice(5, 7)) >= Number(personData.detail.birthday.slice(5, 7)))
                    ? (Number(utc.slice(0, 4)) - Number(personData.detail.birthday.slice(0, 4)))
                    : (Number(utc.slice(0, 4)) - Number(personData.detail.birthday.slice(0, 4)) - 1)} years old)`}
                </p>
              </div>
            }
            {
              personData.detail.deathday && <div className="detail-wrapper text-white">
                <h3 className='text-3xl sm:text-xl'>Deathday</h3>
                <p className='text-xl sm:text-lg font-extralight'>{personData.detail.deathday}</p>
              </div>
            }
            {
              personData.detail.place_of_birth && <div className="detail-wrapper text-white">
                <h3 className='text-3xl sm:text-xl'>Place of Birth</h3>
                <p className='text-2xl sm:text-xl font-extralight'>{personData.detail.place_of_birth}</p>
              </div>
            }
            {
              personData.detail.also_known_as.length > 0 && <div className="detail-wrapper text-white">
              <h3 className='text-3xl sm:text-xl'>Also Known As</h3>
              {
                personData.detail.also_known_as.map((known_name, idx)=> <p key={idx} className='text-2xl sm:text-xl font-thin'>{known_name}</p>) 
              }
            </div>
            }
          </div>
        </div>

        {/* Right Part */}
        <div className="right min-h-[50vh] sm:w-[75%] text-white flex flex-col gap-10 sm:gap-8">
          {
            personData.detail.name && <h1 className='text-5xl'>{personData.detail.name}</h1>
          }
          {
            personData.detail.biography && <div className='flex flex-col gap-4'>
              <h3 className='text-3xl sm:text-2xl'>Biography</h3>
              <p className='sm:w-[80%] text-lg font-light'>{personData.detail.biography}</p>
            </div>
          }
          {
            personData.credits.cast.length > 0 && (
              <div className='flex flex-col gap-1 sm:gap-4 sm:w-[80%]'>
                <h3 className='text-3xl sm:text-2xl'>Acting</h3>
                <HorizontalData data={personData.credits.cast}/>
              </div>
            )
          }
          {
            personData.credits.crew.length > 0 && (
              <div className='flex flex-col gap-1 sm:gap-4 sm:w-[80%]'>
                <h3 className='text-3xl sm:text-2xl'>Crew</h3>
                <HorizontalData data={personData.credits.crew}/>
              </div>
            )
          }
        </div>
      </div>
    </div>
  ) : <Loader/>
}

export default PeopleDetails