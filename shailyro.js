d3.csv("data/combined_news.csv").then(function (data) {
    const cleanedData = data.filter((d) => d.source && d.subject);

    const perspectiveAData = d3.rollups(
        cleanedData.filter((d) => d.source === "fake"),
        (v) => v.length,
        (d) => d.subject
    ).map(([key, value]) => ({ subject: key, count: value }));

    const perspectiveBData = d3.rollups(
        cleanedData,
        (v) => ({
            fake: v.filter((d) => d.source === "fake").length,
            true: v.filter((d) => d.source === "TRUE").length,
        }),
        (d) => d.subject
    ).map(([key, value]) => ({ subject: key, ...value }));

    const width = 600;
    const height = 400;
    const margin = { top: 50, right: 30, bottom: 80, left: 160 };
    const radius = Math.min(width, height) / 2 - margin.top;

    const colorPalette = [
        "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#e377c2",
        "#ff33ff", "#f9ff33", "#bcbd22", "#17becf", "#1f77b4"
    ];

    const colorScale = d3.scaleOrdinal()
        .domain([...perspectiveAData.map(d => d.subject), ...perspectiveBData.map(d => d.subject)])
        .range(colorPalette);

    const svgA = d3.select("#fake-news-word-cloud")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const xScaleA = d3.scaleBand()
        .domain(perspectiveAData.map((d) => d.subject))
        .range([margin.left, width - margin.right])
        .padding(0.3);

    const yScaleA = d3.scaleLinear()
        .domain([0, d3.max(perspectiveAData, (d) => d.count)])
        .nice()
        .range([height - margin.bottom, margin.top]);

    const opacityScale = d3.scaleLinear()
        .domain([0, d3.max(perspectiveAData, (d) => d.count)])
        .range([0.3, 1]); 

    svgA.selectAll("rect")
        .data(perspectiveAData)
        .enter()
        .append("rect")
        .attr("x", (d) => xScaleA(d.subject))
        .attr("y", (d) => yScaleA(d.count))
        .attr("width", xScaleA.bandwidth())
        .attr("height", (d) => height - margin.bottom - yScaleA(d.count))
        .attr("fill", (d) => colorScale(d.subject))
        .attr("opacity", (d) => opacityScale(d.count));

    svgA.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xScaleA))
        .selectAll("text")
        .attr("transform", "rotate(45)")
        .style("text-anchor", "start");

    svgA.append("text")
        .attr("x", width / 2)
        .attr("y", height - margin.bottom / 9)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .text("News Topics");

    svgA.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScaleA));

    svgA.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", margin.left / 2 + 30)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .text("Count of Fake News");

    svgA.append("text")
        .attr("x", width / 2)
        .attr("y", margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-weight", "bold")
        .style("font-size", "16px")
        .text("Sensationalized Fake News by Topic");

    const svgB = d3.select("#true-news-word-cloud")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const pieGroup = svgB.append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie().value((d) => d.fake + d.true);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    pieGroup.selectAll("path")
        .data(pie(perspectiveBData))
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", (d) => colorScale(d.data.subject));

    svgB.append("text")
        .attr("x", width / 2)
        .attr("y", margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-weight", "bold")
        .style("font-size", "16px")
        .text("Fake vs True News Distribution by Topic");

    const legendGroup = svgB.append("g").attr("transform", `translate(${width - margin.right - 200}, ${margin.top})`);

    const trueData = perspectiveBData.filter((d) => d.true > 0);
    const fakeData = perspectiveBData.filter((d) => d.fake > 0);

    legendGroup.append("text")
        .attr("x", 100)
        .attr("y", 0)
        .style("font-size", "15px")
        .text("True:");

    legendGroup.selectAll(".true-legend")
        .data(trueData)
        .enter()
        .append("rect")
        .attr("x", 100)
        .attr("y", (d, i) => 20 + i * 20)
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", (d) => colorScale(d.subject));

    legendGroup.selectAll(".true-legend-text")
        .data(trueData)
        .enter()
        .append("text")
        .attr("x", 120)
        .attr("y", (d, i) => 32 + i * 20)
        .style("font-size", "15px")
        .text((d) => d.subject);

    legendGroup.append("text")
        .attr("x", 100)
        .attr("y", 20 + trueData.length * 20 + 20)
        .style("font-size", "15px")
        .text("Fake:");

    legendGroup.selectAll(".fake-legend")
        .data(fakeData)
        .enter()
        .append("rect")
        .attr("x", 100)
        .attr("y", (d, i) => 20 + trueData.length * 20 + 40 + i * 20)
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", (d) => colorScale(d.subject));

    legendGroup.selectAll(".fake-legend-text")
        .data(fakeData)
        .enter()
        .append("text")
        .attr("x", 120)
        .attr("y", (d, i) => 32 + trueData.length * 20 + 40 + i * 20)
        .style("font-size", "14px")
        .text((d) => d.subject);
});
