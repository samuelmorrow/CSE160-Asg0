function main() {
    // Retrieve the <canvas> element
    const canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return false;
    }

    // Get the rendering context for 2D graphics
    const ctx = canvas.getContext('2d');

    // Set a blue color
    /* ctx.fillStyle = 'rgba(0, 0, 255, 1.0)';
    */
    // Draw a blue rectangle
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "black"
    const v1 = new Vector3([2.25, 2.25, 0]);
    //drawVector(v1, "red"); 
    document.addEventListener('DOMContentLoaded', handleDrawEvent())
}

function drawVector(v, color) {
    const canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return false;
    }
    const ctx = canvas.getContext('2d');

    const scale = 20; // Scale factor for visualization

    // Extract vector components
    const x = v.elements[0] * scale;
    const y = v.elements[1] * scale;

    // Set the vector's color
    ctx.strokeStyle = color;

    // Draw the vector from the origin
    ctx.beginPath();
    ctx.moveTo(200, 200); // Assume (200, 200) as the origin
    ctx.lineTo(200 + x, 200 - y); // Invert y-axis for canvas
    ctx.stroke();
}
function handleDrawEvent() {
    const valx1 = parseFloat(document.getElementById('v1x').value);
    const valy1 = parseFloat(document.getElementById('v1y').value);
    const valx2 = parseFloat(document.getElementById('v2x').value);
    const valy2 = parseFloat(document.getElementById('v2y').value);
    const canvas = document.getElementById('example');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    const v1 = new Vector3([valx1, valy1, 0]);
    const v2 = new Vector3([valx2, valy2, 0]);
    drawVector(v1, "red");
    drawVector(v2, "blue");
}

function handleDrawOperationEvent() {
    
    const valx1 = parseFloat(document.getElementById('v1x').value);
    const valy1 = parseFloat(document.getElementById('v1y').value);
    const valx2 = parseFloat(document.getElementById('v2x').value);
    const valy2 = parseFloat(document.getElementById('v2y').value);
    const operation = document.getElementById('select-operation').value;
    const scalar = parseFloat(document.getElementById('scalar').value);
    const canvas = document.getElementById('example');
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    const v1 = new Vector3([valx1, valy1, 0]);
    const v2 = new Vector3([valx2, valy2, 0]);
    drawVector(v1, 'red');
    drawVector(v2, 'blue');
    if (operation == 'add') {
        const v3 = new Vector3(v1.elements).add(v2);
        drawVector(v3, 'green');
    }
    else if (operation == 'subtract') {
        const v3 = new Vector3(v1.elements).sub(v2);
        drawVector(v3, 'green');
    }
    else if (operation == 'multiply') {
        const v3 = new Vector3(v1.elements).mul(scalar);
        drawVector(v3, 'green');
        const v4 = new Vector3(v2.elements).mul(scalar);
        drawVector(v4, 'green');
    }
    else if (operation == 'divide') {
        const v3 = new Vector3(v1.elements).div(scalar);
        drawVector(v3, 'green');
        const v4 = new Vector3(v2.elements).div(scalar);
        drawVector(v4, 'green');
    }
    else if (operation == 'magnitude') {
        console.log("Magnitude of v1: " + v1.magnitude());
        console.log("Magnitude of v2: " + v2.magnitude());
    }
    else if (operation == 'normalize') {
        const v3 = new Vector3(v1.elements).normalize();
        drawVector(v3, 'green');
        const v4 = new Vector3(v2.elements).normalize();
        drawVector(v4, 'green');
    }
    else if (operation == 'angle') {
        console.log("Angle: " + angleBetween(v1, v2));
    }
    else if (operation == 'area') {
        console.log("Area of the Triangle: " + areaTriangle(v1, v2));
    }
    
    
    function angleBetween(v1, v2) {
        if (v1.magnitude() == 0 || v2.magnitude() == 0) {
            console.log('Cannot divide by 0');
            return;
        }
        const dotProduct = Vector3.dot(v1,v2);
        const magnitudesMultiplied = v1.magnitude() * v2.magnitude();
        const cosAlpha = dotProduct / magnitudesMultiplied;
        const angleInRadians = Math.acos(cosAlpha);
        const angleInDegrees = (angleInRadians * 180) / Math.PI;
        console.log(magnitudesMultiplied);
        return angleInDegrees;
    }

    function areaTriangle(v1, v2) {
        const crossProduct = Vector3.cross(v1, v2);
        const magnitude = crossProduct.magnitude();
        return magnitude / 2;

    }
}