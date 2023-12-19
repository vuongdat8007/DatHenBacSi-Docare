import React from 'react'
import aboutImg from '../../assets/images/about.png';
import aboutCardImg from '../../assets/images/about-card.png';
import { Link } from 'react-router-dom';

const About = () => {
  return (
  <section>
    <div className="container">
        <div className="flex justify-between gap-[130px] xl:gap-0 flex-col lg:flex-row">

            { /* ========== about img ========== */}
            <div className='relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1'>
                <img src={aboutImg} alt="" />
                <div className='absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[7%] lg:right-[22%]'>
                    <img src={aboutCardImg} alt="" />
                </div>
            </div>
            
            { /* ========== about content ========== */}
            <div className='w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2'>
                <h2 className='heading'>Tự hào là một trong số những đơn vị tốt nhất nước</h2>
                <p className='text__para'>
                    Trong 30 năm liên tục, các tờ báo: Thuốc & Sức Khoẻ và Tuổi Trẻ công nhận chúng tôi là hệ thống phòng khám bệnh tốt nhất nước và số #1 tại Sài Gòn.
                </p>
                <p className="text__para mt-[30px]">
                    Điều tốt nhất đối với chúng tôi là cố găng hàng ngày, chăm sóc cho bệnh nhân-không nao núng, không nhìn lại phía sau. Không thoả mãn với thành tích đã đạt được, mà luôn luôn tiến về phía trước; nhìn về tương lai xem có thể làm được gì hơn nữa cho bệnh nhân!   
                </p>
                <Link to='/'>
                    <button className='btn'>Tìm hiểu thêm</button>
                </Link>
            </div>

        </div>
    </div>
  </section>
  );
};

export default About;