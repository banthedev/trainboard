import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Input,
} from '@chakra-ui/react';

export default function WorkoutViewTable({ exercises, onExerciseChange }) {
    const columns = ["exerciseName", "sets", "reps"];

    const handleCellChange = (value, rowIndex, colIndex) => {
        const newExercises = exercises.map((exercise, i) => {
            if (i === rowIndex) {
                return {
                    ...exercise,
                    [columns[colIndex]]: value,
                };
            }
            return exercise;
        });
        onExerciseChange(newExercises);
    };

    return (
        <TableContainer marginLeft="20px" marginRight="20px" marginBottom="20px">
            <Table variant="simple">
                <Thead>
                    <Tr>
                        {columns.map((col) => (
                            <Th key={col}>{col}</Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody>
                    {exercises.map((exercise, rowIndex) => (
                        <Tr key={rowIndex}>
                            {columns.map((key, colIndex) => (
                             <Td key={`${rowIndex}-${colIndex}`}
                             border={"2px solid black"} 
                             border-radius={"2px"}
                             padding={"0px"}>
                             <Input
                                 readOnly
                                 border="none"
                                 height="75px"
                                 borderColor={"white"}
                                 value={exercise[key]}
                                 onChange={(e) =>
                                     handleCellChange(e.target.value, rowIndex, colIndex)
                                 }
                             />
                         </Td>
                            ))}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}
