import React from 'react'
import { TEAM_ROSTER } from '../../libs/consts/TeamRoster';
import walkway from '../../assets/tower.jpg';


function Team() {
    function handleOnclickTeam( link){
        window.location.href = link;
    }

    function TeamCard({ position, individual, description, img, link }) {
        return (
            <div onClick={() => handleOnclickTeam(link)} className="cursor-pointer opacity-90 bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                <img src={img} alt={individual} className="w-full h-48 object-cover" />
                <div className="p-6">
                    <h2 className="text-xl font-bold mb-2">{position}: {individual}</h2>
                    <p className="text-gray-600">{description}</p>
                </div>
            </div>
        );
    }

    return (
        <section style={{ backgroundImage: `url(${walkway})` }} className='min-h-screen bg-cover bg-center bg-fixed flex flex-col items-center justify-center py-20'>
            <div className='container mx-auto'>
                <h1 className='text-4xl font-bold text-white text-center mb-12'>Meet Our Team</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {TEAM_ROSTER.map((item, index) => (
                        <TeamCard
                            key={index}
                            position={item.position}
                            individual={item.individual}
                            description={item.description}
                            img={item.img}
                            link={item.link}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Team
