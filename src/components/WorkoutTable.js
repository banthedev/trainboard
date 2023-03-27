import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
  } from '@chakra-ui/react'

export default function WorkoutTable() {
    return (
        <TableContainer>
            <Table variant='simple'>
                <Thead>
                <Tr>
                    <Th>Exercise</Th>
                    <Th>Sets</Th>
                    <Th>Reps</Th>
                </Tr>
                </Thead>
                <Tbody>
                <Tr>
                    <Td>dummy text</Td>
                    <Td>dummy text</Td>
                    <Td>dummy text</Td>
                </Tr>
                <Tr>
                    <Td>dummy text</Td>
                    <Td>dummy text</Td>
                    <Td>dummy text</Td>
                </Tr>
                <Tr>
                    <Td>dummy text</Td>
                    <Td>dummy text</Td>
                    <Td>dummy text</Td>
                </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    )

} 