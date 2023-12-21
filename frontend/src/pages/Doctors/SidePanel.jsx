const SidePanel = () => {
  return (
    <div className='shadow-panelShadow p-3 lg:p-5 rounded-md'>
        <div className='flex items-center justify-between'>
            <p className='text__para mt-0 font-semibold'>Giá vé</p>
            <span className='text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold'>
                500.000đ
            </span>
        </div>

        <div className='mt-[30px]'>
            <p className='text__para mt-0 font-semibold text-headingColor'>
                Khoảng thời gian trống:
            </p>
            <ul className='mt-3'>
                <li className='flex items-center justify-between mb-2'>
                    <p className='text-[15px] leading-6 text-textColor font-semibold'>
                        Chủ Nhật
                    </p>
                    <p className='text-[15px] leading-6 text-textColor font-semibold'>
                        04:00 CH - 09:00 CH
                    </p>
                </li>
                <li className='flex items-center justify-between mb-2'>
                    <p className='text-[15px] leading-6 text-textColor font-semibold'>
                        Thứ Ba
                    </p>
                    <p className='text-[15px] leading-6 text-textColor font-semibold'>
                        08:00 CH - 10:00 CH
                    </p>
                </li>
                <li className='flex items-center justify-between mb-2'>
                    <p className='text-[15px] leading-6 text-textColor font-semibold'>
                        Thứ Năm
                    </p>
                    <p className='text-[15px] leading-6 text-textColor font-semibold'>
                        11:00 SA - 02:00 CH
                    </p>
                </li>
            </ul>
        </div>

        <button className='btn px-2 w-full rounded-md'>Đặt lịch hẹn</button>
    </div>
  )
}

export default SidePanel