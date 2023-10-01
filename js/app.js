// app.js
$(document).ready(function () {
    // Load family tree data
    $.getJSON('family-tree-data.json', function (data) {
        // Generate family tree HTML
        var familyTreeHtml = generateFamilyTreeHtml(data);
        
        // Append HTML to the familyTree div
        $('#familyTree').append(familyTreeHtml);
        
        // Click event on family member
        $('.family-member').on('click', function () {
            var memberId = $(this).data('id');
            showMemberDetails(data, memberId);
        });
    });

    // Function to generate family tree HTML
    function generateFamilyTreeHtml(person) {
        var html = '<ul class="list-group">';
        html += '<li class="list-group-item family-member" data-id="0">' + person.name + '</li>';

        if (person.children && person.children.length > 0) {
            html += '<ul class="list-group mt-2">';
            $.each(person.children, function (index, child) {
                html += '<li class="list-group-item family-member" data-id="' + (index + 1) + '">' + child.name + '</li>';
            });
            html += '</ul>';
        }

        html += '</ul>';
        return html;
    }

    // Function to show family member details
    function showMemberDetails(data, memberId) {
        var member = findMemberById(data, memberId);
        if (member) {
            var detailsHtml = '<div class="card">';
            detailsHtml += '<img src="' + member.profilePic + '" class="card-img-top" alt="' + member.name + '">';
            detailsHtml += '<div class="card-body">';
            detailsHtml += '<h5 class="card-title">' + member.name + '</h5>';
            detailsHtml += '<p>Age: ' + member.age + '</p>';
            detailsHtml += '<p>Gender: ' + member.gender + '</p>';
            detailsHtml += '<p>Occupations: ' + member.occupations.join(', ') + '</p>';
            detailsHtml += '<p>Spouse: ' + (member.spouse || 'N/A') + '</p>';
            detailsHtml += '<p>Children: ' + (member.children ? member.children.map(child => child.name).join(', ') : 'N/A') + '</p>';
            detailsHtml += '<p>' + member.profileDescription + '</p>';
            detailsHtml += '</div></div>';

            // Hide family tree and show detail page
            $('#familyTree').addClass('d-none');
            $('#detailPage').removeClass('d-none');
            $('#memberDetails').html(detailsHtml);
        }
    }

    // Function to find a family member by ID
    function findMemberById(person, memberId) {
        if (memberId === 0) {
            return person;
        }

        if (person.children && person.children.length > 0) {
            for (var i = 0; i < person.children.length; i++) {
                var result = findMemberById(person.children[i], memberId - 1);
                if (result) {
                    return result;
                }
            }
        }

        return null;
    }

    // Function to go back to the family tree
    window.goBack = function () {
        // Show family tree and hide detail page
        $('#familyTree').removeClass('d-none');
        $('#detailPage').addClass('d-none');
    };
});
