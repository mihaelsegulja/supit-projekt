/* Curriculum logic */

jQuery(function($) {
    const token = sessionStorage.getItem("token");
    let curriculumList = new Array();

    if(token) {
        $.ajax({
            url: "https://www.fulek.com/data/api/supit/curriculum-list/hr",
            method: "GET",
            contentType: "application/json",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            success: function(response) {
                if(response.isSuccess && response.data) {
                    curriculumList.push(...response.data);
                    // console.log(curriculumList);

                    curriculumAutocomplete(curriculumList);
                }
            },
            error: function(xhr) {
                console.log("Fetching curriculum list failed: " + xhr.responseText);
            }
        });
    } else {
        window.location.href = "/views/login.html";
    }

    function curriculumAutocomplete(dataList) {
        $("#curriculum-list").autocomplete({
            minLength: 0,
            source: dataList.map(item => item.kolegij),
            select: function(event, ui) {
                let selectedCourse = ui.item.value;

                // Find the full item data
                let selectedItem = dataList.find(item => item.kolegij === selectedCourse);

                if(selectedItem) {
                    // Add the selected item to the table
                    let newRow = `
                        <tr>
                            <td data-label="Kolegij">${selectedItem.kolegij}</td>
                            <td data-label="ECTS" id="ects" data-value="${selectedItem.ects}">${selectedItem.ects}</td>
                            <td data-label="Sati" id="hours" data-value="${selectedItem.sati}">${selectedItem.sati}</td>
                            <td data-label="Predavanja" id="lectures" data-value="${selectedItem.predavanja}">${selectedItem.predavanja}</td>
                            <td data-label="Vježbe" id="exercises" data-value="${selectedItem.vjezbe}">${selectedItem.vjezbe}</td>
                            <td data-label="Tip">${selectedItem.tip}</td>
                            <td><button class="remove-row">Obriši</button></td>
                        </tr>
                    `;

                    // Append the new row to the table body
                    $("table tbody").append(newRow);

                    updateTotals();
                    updateTableDescriptions();
                }
            },
            open: function() {
                $(".ui-menu").css({
                    "width": $("#curriculum-list").outerWidth()
                });
            }
        })
        .on("focus", function(){
            $(this).autocomplete("search", $(this).val());
        });
    }

    // Event delegation for removing rows
    $("table").on("click", ".remove-row", function() {
        $(this).closest("tr").remove();

        updateTotals();
        updateTableDescriptions();
    });
    
    function updateTotals() {
        let totalEcts = 0;
        let totalHours = 0;
        let totalLectures = 0;
        let totalExercises = 0;

        // Loop through each row in the table body
        $("table tbody tr").each(function() {
            totalEcts += parseInt($(this).find("#ects").data("value")) || 0;
            totalHours += parseInt($(this).find("#hours").data("value")) || 0;
            totalLectures += parseInt($(this).find("#lectures").data("value")) || 0;
            totalExercises += parseInt($(this).find("#exercises").data("value")) || 0;
        });
    
        // Update the footer
        $("#total-ects").text(totalEcts);
        $("#total-hours").text(totalHours);
        $("#total-lectures").text(totalLectures);
        $("#total-exercises").text(totalExercises);
    }

    function updateTableDescriptions() {
        const isSmallScreen = $(window).width() <= 550;
    
        // Handle <td> elements in <tbody>
        $("table tbody td[data-label]").each(function() {
            const label = $(this).attr("data-label");
            const content = $(this).text().trim();
    
            if (isSmallScreen) {
                // Add label to content if not already added
                if (!content.startsWith(`${label}:`)) {
                    $(this).text(`${label}: ${content}`);
                }
            } else {
                // Remove label from content if it exists
                if (content.startsWith(`${label}:`)) {
                    $(this).text(content.replace(`${label}: `, ""));
                }
            }
        });
    
        // Handle <th> elements in <tfoot>
        $("table tfoot th[data-label]").each(function() {
            const label = $(this).attr("data-label");
            const content = $(this).text().trim();
    
            if (isSmallScreen) {
                // Add label to content if not already added
                if (!content.startsWith(`${label}:`)) {
                    $(this).text(`${label}: ${content}`);
                }
            } else {
                // Remove label from content if it exists
                if (content.startsWith(`${label}:`)) {
                    $(this).text(content.replace(`${label}: `, ""));
                }
            }
        });
    }

    // Update on page load
    updateTableDescriptions();
    // Update on window resize
    $(window).on("resize", updateTableDescriptions);
});
