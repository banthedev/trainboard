import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Editable,
    EditablePreview,
    EditableInput
} from '@chakra-ui/react';


export default function WorkoutTable({ exercises, onExerciseChange }) {
    const columns = ["Exercise", "Sets", "Reps"];

    const handleCellChange = (value, rowIndex, colIndex) => {
        const newExercises = exercises.map((exercise, i) => {
            if (i === rowIndex) {
                return {
                    ...exercise,
                    [Object.keys(exercise)[colIndex]]: value,
                };
            }
            return exercise;
        });
        onExerciseChange(newExercises);
    };

    return (
        <TableContainer>
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
                            {Object.values(exercise).map((cell, colIndex) => (
                                <Td key={`${rowIndex}-${colIndex}`}>
                                    <Editable
                                        value={cell}
                                        onChange={(value) =>
                                            handleCellChange(value, rowIndex, colIndex)
                                        }
                                    >
                                        <EditablePreview />
                                        <EditableInput />
                                    </Editable>
                                </Td>
                            ))}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}