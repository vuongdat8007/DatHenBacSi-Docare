
const Contact = () => {
  return (
    <section>
      <div className='px-4 mx-auto max-w-screen-md '>
        <h2 className='heading text-center mb-3 lg:mb-5'>Liên Hệ Chúng Tôi</h2>
        <p className='mb-8 lg:mb-16 font-light text-center'>
          Bạn gặp vấn đề về kỹ thuật? Hay bạn muốn gửi thông tin phản hồi hoặc muốn yêu cầu chức năng/ tính năng thử nghiệm? Hãy cho chúng tôi được biết.
        </p>
        <form action="" className='space-y-8'>
          <div>
            <label htmlFor="email" className='form__label'>
              Email của bạn
            </label>
            <input 
              type="email" 
              id='email' 
              placeholder='example@email.com' 
              className='form__input mt-1'
            />
          </div>
          <div>
            <label htmlFor="subject" className='form__label'>
              Tiêu đề
            </label>
            <input 
              type="text" 
              id='subject' 
              placeholder='Vui lòng đặt tiêu đề của nội dung cần liên hệ' 
              className='form__input mt-1'
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className='form__label'>
              Nội dung lời nhắn
            </label>
            <textarea 
              type="text" 
              id='message' 
              rows='6'
              placeholder='Nhập vào nội dung bạn muốn gửi đến chúng tôi...' 
              className='form__input mt-1'
            />
          </div>
          <button type="submit" className="btn rounded sm:w-fit">
            Gửi lời nhắn
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact