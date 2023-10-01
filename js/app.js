const familyTreeData = {
    name: "John",
    age: 45,
    gender: "Male",
    profilePic: "john.jpg",
    profileDescription: "Loving husband and father",
    occupations: ["Engineer"],
    spouse: "Jane",
    children: [
        {
            name: "Alice",
            age: 18,
            gender: "Female",
            profilePic: "alice.jpg",
            profileDescription: "Aspiring artist",
            occupations: ["Student"]
        },
        {
            name: "Bob",
            age: 15,
            gender: "Male",
            profilePic: "bob.jpg",
            profileDescription: "Sports enthusiast",
            occupations: ["Student"]
        }
    ]
};

// Function to build the family tree using D3.js
function buildFamilyTree(data) {
    const svg = d3.select("#family-tree")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", [0, 0, 800, 500])
        .attr("preserveAspectRatio", "xMidYMid meet");

    const treeLayout = d3.tree().size([800, 500]);

    const root = d3.hierarchy(data);
    const treeData = treeLayout(root);

    const links = svg.selectAll(".link")
        .data(treeData.links())
        .enter().append("path")
        .attr("class", "link")
        .attr("d", d3.linkHorizontal()
            .x(d => d.y)
            .y(d => d.x));

    const nodes = svg.selectAll(".node")
        .data(treeData.descendants())
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.y},${d.x})`);

    nodes.append("circle")
        .attr("r", 10)
        .attr("fill", "#3498db");

    nodes.append("text")
        .attr("dy", "0.31em")
        .attr("x", d => d.children ? -10 : 10)
        .style("text-anchor", d => d.children ? "end" : "start")
        .text(d => d.data.name)
        .on("click", showMemberDetails);
}

function showMemberDetails(member) {
    // Create a modal container
    const modalContainer = document.createElement("div");
    modalContainer.classList.add("modal-container");

    // Create modal content
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    // Add member details to modal content
    modalContent.innerHTML = `
        <img src="${member.data.profilePic}" alt="${member.data.name}" class="modal-profile-pic">
        <h2>${member.data.name}</h2>
        <p>Age: ${member.data.age}</p>
        <p>Gender: ${member.data.gender}</p>
        <p>Description: ${member.data.profileDescription}</p>
        <p>Occupations: ${member.data.occupations.join(", ")}</p>
        <p>Spouse: ${member.data.spouse || 'N/A'}</p>
        <p>Children: ${member.data.children.map(child => child.name).join(", ") || 'N/A'}</p>
    `;

    // Add modal content to modal container
    modalContainer.appendChild(modalContent);

    // Add modal container to the document body
    document.body.appendChild(modalContainer);

    // Close modal when clicking outside of it
    modalContainer.addEventListener("click", () => {
        document.body.removeChild(modalContainer);
    });

    // Prevent modal from closing when clicking inside it
    modalContent.addEventListener("click", (event) => {
        event.stopPropagation();
    });
}


window.addEventListener("load", () => {
    buildFamilyTree(familyTreeData);
});
