import DoctorCard from './../../components/Doctors/DoctorCard';
import { doctors } from './../../assets/data/doctors';
import Testimonial from './../../components/Testimonial/Testimonial';

const Doctors = () => {
  return <>
  
    <section className='bg-[#fff9ea]'>
      <div className="container text-center">
        <h2 className='heading'>
           Tìm Bác Sĩ
        </h2>
        <div className='max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between'>
            <input type="search" className='py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor' placeholder='Nhập chữ để tìm kiếm' />
            <button className='btn mt-0 rounded-[0px] rounded-r-md text-xl cursor-zoom-in '>Tìm...</button>
        </div>
      </div>
    </section>

    <section>
      <div className="container">
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
          {doctors.map(doctor => (
              <DoctorCard key={doctor.id} doctor={doctor} /> 
          ))}
      </div>
      </div>
    </section>

    <section>
      <div className="container">
        <div className="xl:w-[470px] mx-auto">
              <h2 className='heading text-center'>
                Lời chứng thực của các bệnh nhân
              </h2>
              <p className='text__para text-center'>
                Sự chăm sóc tầm cỡ thế giới cho mọi người. Hệ thống chăm sóc sức khoẻ của chúng tôi rất chuyên nghiệp và vô tiền khoáng hậu.
              </p>
        </div>

        <Testimonial></Testimonial>
      </div>
    </section>
  
  </>
}

export default Doctors