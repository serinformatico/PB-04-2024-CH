const tableRows = document.getElementById("table-rows");
const btnRefreshTableRows = document.getElementById("btn-refresh-table-rows");

const loadStudents = async () => {
    const response = await fetch("/api/students", { method: "GET" });
    const data = await response.json();
    const students = data.payload;

    tableRows.innerText = "";

    students.forEach((item) => {
        const tr = document.createElement("tr");

        tr.innerHTML = (`
            <td>${item.name}</td>
            <td>${item.surname}</td>
            <td>${item.email}</td>
        `);

        tableRows.append(tr);
    });
};

btnRefreshTableRows.onclick = () => {
    loadStudents();
};