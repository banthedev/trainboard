import { Input } from '@chakra-ui/react'

export default function Searchbar(){
    return(
        <Input variant="outline" placeholder='Search Here' size='lg' width="50%" 
        float="left" marginLeft='5%' marginTop="1%" focusBorderColor='black'
        _placeholder={{ color: 'black' }} bg='white' />
    );
}