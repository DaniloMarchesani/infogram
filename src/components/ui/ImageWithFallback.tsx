
import {Skeleton} from "@nextui-org/react";
import React from "react";
import {Image} from "@nextui-org/react";

function ImageWithFallback( {imgUrl}: {imgUrl: string}) {

    const [isLoaded, setIsLoaded] = React.useState(false);

  return (
        <Skeleton className="rounded-2xl" isLoaded={isLoaded}>
            <div className='rounded-2xl overflow-hidden cursor-pointer'>
                <Image src={imgUrl} alt="random"  onLoad={() => setIsLoaded(!isLoaded)}/>
            </div>
        </Skeleton>
  )
}

export default ImageWithFallback