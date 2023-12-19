import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import {RiLinkedinFill} from 'react-icons/ri';
import {AiFillYoutube, AiFillGithub, AiOutlineInstagram} from 'react-icons/ai';

const socialLinks = [
  {
    path: "https://www.youtube.com/channel/UCAs_WVq5bR3QQmumv7F8bwA/",
    icon: <AiFillYoutube className='group-hover:text-white w-4 h-5' />
  },
  {
    path: "https://github.com/vuongdat8007/Docare",
    icon: <AiFillGithub className='group-hover:text-white w-4 h-5' />
  },
  {
    path: "https://www.youtube.com/channel/UCAs_WVq5bR3QQmumv7F8bwA/",
    icon: <AiOutlineInstagram className='group-hover:text-white w-4 h-5' />
  },
  {
    path: "https://www.youtube.com/channel/UCAs_WVq5bR3QQmumv7F8bwA/",
    icon: <RiLinkedinFill className='group-hover:text-white w-4 h-5' />
  },
];

const quickLinks01 = [
  {
    path: '/home',
    display: 'Trang chủ',
  },
  {
    path: '/about-us',
    display: 'Về chúng tôi',
  },
  {
    path: '/services',
    display: 'Dịch vụ',
  },
  {
    path: '/',
    display: 'Blog',
  },
];

const quickLinks02 = [
  {
    path: "/find-a-doctor",
    display: "Tìm Bác Sĩ",
  },
  {
    path: "/",
    display: "Đặt lịch hẹn khám bệnh",
  },
  {
    path: "/",
    display: "Tìm địa điểm phòng khám",
  },
  {
    path: "/",
    display: "Tham vấn y tế",
  },
];

const quickLinks03 = [
  {
    path: "/donate",
    display: "Quyên góp",
  },
  {
    path: "/contact",
    display: "Liên hệ với chúng tôi",
  },
];

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className='pb-16 pt-10'>
    <div className='container'>
      <div className='flex justify-between flex-col md:flex-row flex-wrap gap-[30px]'>
        <div>
          <img src={logo} alt="" className='w-[134px] h-[34px]'/>
          <p className='text-[16px] leading-7 font-[400] text-textColor'>
            Quyền tác giả © {year} phát triển bởi HuTech 20TXTH02, mọi quyền được bảo lưu.
          </p>

          <div className='flex items-center gap-3 mt-4'>
            {socialLinks.map((link, index) => <Link to={link.path} key={index} className='w-9 h-9 border border-solid border-[#181A1E] rounded-full flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
              {link.icon}
            </Link>)}
          </div>
        </div>

        <div>
          <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-headingColor'>
            Liên kết nhanh
          </h2>

          <ul>
            {quickLinks01.map((item, index) => <li key={index} className='mb-4'>
              <Link to={item.path} key={index} className='text-[16px] leading-7 font-[400] text-textColor'>
              {item.display}
            </Link></li>
            )}
          </ul>
        </div>

        <div>
          <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-headingColor'>
            Có phải bạn muốn
          </h2>

          <ul>
            {quickLinks02.map((item, index) => <li key={index} className='mb-4'>
              <Link to={item.path} key={index} className='text-[16px] leading-7 font-[400] text-textColor'>
              {item.display}
            </Link></li>
            )}
          </ul>
        </div>

        <div>
          <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-headingColor'>
            Hỗ trợ
          </h2>

          <ul>
            {quickLinks03.map((item, index) => <li key={index} className='mb-4'>
              <Link to={item.path} key={index} className='text-[16px] leading-7 font-[400] text-textColor'>
              {item.display}
            </Link></li>
            )}
          </ul>
        </div>

      </div>
    </div>
    </footer>
  )
}

export default Footer