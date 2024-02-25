import { faker } from "@faker-js/faker"
import ImageWithFallback from '../components/ui/ImageWithFallback'


function Homepage() {
  return (
    <div className='text-center'>
        <div className='p-10 flex flex-col gap-3 items-center'>
          <h1 className='text-4xl'>Welcome to Infogram</h1>
          <p className='text-wrap max-w-screen-lg italic mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero aspernatur id cumque eius, asperiores deleniti quia illum quibusdam, vel ad at ab expedita modi architecto, facilis molestiae reprehenderit inventore alias.</p>
        </div>

        <div className='grid lg:grid-cols-3 md:grid-cols-2'>
          {Array.from({length: 9}).map((_, index) => (
            <div key={index} className='p-3 lg:p-4'>
              <ImageWithFallback imgUrl={faker.image.url()} />
            </div>
          ))}
        </div>
    </div>
  )
}

export default Homepage