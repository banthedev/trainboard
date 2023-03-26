import { Input } from '@chakra-ui/react'

export default function Searchbar(){
    return(
        <Input variant="filled" placeholder='Search Here' size='lg' width="50%" 
        float="left" marginLeft='5%' marginTop="1%"/>
    );
}