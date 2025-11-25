function CharacteristicsTable({ characteristics }) {
  if (!characteristics) return null;

  return (
    <table border="1" cellPadding="5">
        <tbody>
            {Object.entries(characteristics).map(([key, value]) => (
            <tr key={key}>
                <td><strong>{key}</strong></td>
                <td>{value}</td>
            </tr>
            ))}
        </tbody>
    </table>
  );
}

export default CharacteristicsTable;
