<template>
  <div class="main">
    <canvas id="canvasMap" style="display:none;"></canvas>
    <div id="kljmap"></div>
  </div>
</template>


<script>
import world from './world.js'
import points from './point.js'

export default {
  data() {
    return {

    };
  },
  created(){

  },
  mounted() {


Array.prototype.max = function() {
    return Math.max.apply(null, this);
};
Array.prototype.min = function() {
    return Math.min.apply(null, this);
};
Array.prototype.mean = function() {
    var i, sum;
    for (i = 0, sum = 0; i < this.length; i++)
        sum += this[i];
    return sum / this.length;
};
Array.prototype.rep = function(n) {
    return Array.apply(null, new Array(n))
        .map(Number.prototype.valueOf, this[0]);
};
Array.prototype.pip = function(x, y) {
    var i, j, c = false;
    for (i = 0, j = this.length - 1; i < this.length; j = i++) {
        if (((this[i][1] > y) != (this[j][1] > y)) &&
            (x < (this[j][0] - this[i][0]) * (y - this[i][1]) / (this[j][1] - this[i][1]) + this[i][0])) {
            c = !c;
        }
    }
    return c;
}

var kriging = function() {
    var kriging = {};

    // Matrix algebra
    kriging_matrix_diag = function(c, n) {
        var i, Z = [0].rep(n * n);
        for (i = 0; i < n; i++) Z[i * n + i] = c;
        return Z;
    };
    kriging_matrix_transpose = function(X, n, m) {
        var i, j, Z = Array(m * n);
        for (i = 0; i < n; i++)
            for (j = 0; j < m; j++)
                Z[j * n + i] = X[i * m + j];
        return Z;
    };
    kriging_matrix_scale = function(X, c, n, m) {
        var i, j;
        for (i = 0; i < n; i++)
            for (j = 0; j < m; j++)
                X[i * m + j] *= c;
    };
    kriging_matrix_add = function(X, Y, n, m) {
        var i, j, Z = Array(n * m);
        for (i = 0; i < n; i++)
            for (j = 0; j < m; j++)
                Z[i * m + j] = X[i * m + j] + Y[i * m + j];
        return Z;
    };
    // Naive matrix multiplication
    kriging_matrix_multiply = function(X, Y, n, m, p) {
        var i, j, k, Z = Array(n * p);
        for (i = 0; i < n; i++) {
            for (j = 0; j < p; j++) {
                Z[i * p + j] = 0;
                for (k = 0; k < m; k++)
                    Z[i * p + j] += X[i * m + k] * Y[k * p + j];
            }
        }
        return Z;
    };
    // Cholesky decomposition
    kriging_matrix_chol = function(X, n) {
        var i, j, k, sum, p = Array(n);
        for (i = 0; i < n; i++) p[i] = X[i * n + i];
        for (i = 0; i < n; i++) {
            for (j = 0; j < i; j++)
                p[i] -= X[i * n + j] * X[i * n + j];
            if (p[i] <= 0) return false;
            p[i] = Math.sqrt(p[i]);
            for (j = i + 1; j < n; j++) {
                for (k = 0; k < i; k++)
                    X[j * n + i] -= X[j * n + k] * X[i * n + k];
                X[j * n + i] /= p[i];
            }
        }
        for (i = 0; i < n; i++) X[i * n + i] = p[i];
        return true;
    };
    // Inversion of cholesky decomposition
    kriging_matrix_chol2inv = function(X, n) {
        var i, j, k, sum;
        for (i = 0; i < n; i++) {
            X[i * n + i] = 1 / X[i * n + i];
            for (j = i + 1; j < n; j++) {
                sum = 0;
                for (k = i; k < j; k++)
                    sum -= X[j * n + k] * X[k * n + i];
                X[j * n + i] = sum / X[j * n + j];
            }
        }
        for (i = 0; i < n; i++)
            for (j = i + 1; j < n; j++)
                X[i * n + j] = 0;
        for (i = 0; i < n; i++) {
            X[i * n + i] *= X[i * n + i];
            for (k = i + 1; k < n; k++)
                X[i * n + i] += X[k * n + i] * X[k * n + i];
            for (j = i + 1; j < n; j++)
                for (k = j; k < n; k++)
                    X[i * n + j] += X[k * n + i] * X[k * n + j];
        }
        for (i = 0; i < n; i++)
            for (j = 0; j < i; j++)
                X[i * n + j] = X[j * n + i];

    };
    // Inversion via gauss-jordan elimination
    kriging_matrix_solve = function(X, n) {
        var m = n;
        var b = Array(n * n);
        var indxc = Array(n);
        var indxr = Array(n);
        var ipiv = Array(n);
        var i, icol, irow, j, k, l, ll;
        var big, dum, pivinv, temp;

        for (i = 0; i < n; i++)
            for (j = 0; j < n; j++) {
                if (i == j) b[i * n + j] = 1;
                else b[i * n + j] = 0;
            }
        for (j = 0; j < n; j++) ipiv[j] = 0;
        for (i = 0; i < n; i++) {
            big = 0;
            for (j = 0; j < n; j++) {
                if (ipiv[j] != 1) {
                    for (k = 0; k < n; k++) {
                        if (ipiv[k] == 0) {
                            if (Math.abs(X[j * n + k]) >= big) {
                                big = Math.abs(X[j * n + k]);
                                irow = j;
                                icol = k;
                            }
                        }
                    }
                }
            }
            ++(ipiv[icol]);

            if (irow != icol) {
                for (l = 0; l < n; l++) {
                    temp = X[irow * n + l];
                    X[irow * n + l] = X[icol * n + l];
                    X[icol * n + l] = temp;
                }
                for (l = 0; l < m; l++) {
                    temp = b[irow * n + l];
                    b[irow * n + l] = b[icol * n + l];
                    b[icol * n + l] = temp;
                }
            }
            indxr[i] = irow;
            indxc[i] = icol;

            if (X[icol * n + icol] == 0) return false; // Singular

            pivinv = 1 / X[icol * n + icol];
            X[icol * n + icol] = 1;
            for (l = 0; l < n; l++) X[icol * n + l] *= pivinv;
            for (l = 0; l < m; l++) b[icol * n + l] *= pivinv;

            for (ll = 0; ll < n; ll++) {
                if (ll != icol) {
                    dum = X[ll * n + icol];
                    X[ll * n + icol] = 0;
                    for (l = 0; l < n; l++) X[ll * n + l] -= X[icol * n + l] * dum;
                    for (l = 0; l < m; l++) b[ll * n + l] -= b[icol * n + l] * dum;
                }
            }
        }
        for (l = (n - 1); l >= 0; l--)
            if (indxr[l] != indxc[l]) {
                for (k = 0; k < n; k++) {
                    temp = X[k * n + indxr[l]];
                    X[k * n + indxr[l]] = X[k * n + indxc[l]];
                    X[k * n + indxc[l]] = temp;
                }
            }

        return true;
    }

    // Variogram models
    kriging_variogram_gaussian = function(h, nugget, range, sill, A) {
        return nugget + ((sill - nugget) / range) *
            (1.0 - Math.exp(-(1.0 / A) * Math.pow(h / range, 2)));
    };
    kriging_variogram_exponential = function(h, nugget, range, sill, A) {
        return nugget + ((sill - nugget) / range) *
            (1.0 - Math.exp(-(1.0 / A) * (h / range)));
    };
    kriging_variogram_spherical = function(h, nugget, range, sill, A) {
        if (h > range) return nugget + (sill - nugget) / range;
        return nugget + ((sill - nugget) / range) *
            (1.5 * (h / range) - 0.5 * Math.pow(h / range, 3));
    };

    // Train using gaussian processes with bayesian priors
    kriging.train = function(t, x, y, model, sigma2, alpha) {
        var variogram = {
            t: t,
            x: x,
            y: y,
            nugget: 0.0,
            range: 0.0,
            sill: 0.0,
            A: 1 / 3,
            n: 0
        };
        switch (model) {
            case "gaussian":
                variogram.model = kriging_variogram_gaussian;
                break;
            case "exponential":
                variogram.model = kriging_variogram_exponential;
                break;
            case "spherical":
                variogram.model = kriging_variogram_spherical;
                break;
        };

        // Lag distance/semivariance
        var i, j, k, l, n = t.length;
        var distance = Array((n * n - n) / 2);
        for (i = 0, k = 0; i < n; i++)
            for (j = 0; j < i; j++, k++) {
                distance[k] = Array(2);
                distance[k][0] = Math.pow(
                    Math.pow(x[i] - x[j], 2) +
                    Math.pow(y[i] - y[j], 2), 0.5);
                distance[k][1] = Math.abs(t[i] - t[j]);
            }
        distance.sort(function(a, b) { return a[0] - b[0]; });
        variogram.range = distance[(n * n - n) / 2 - 1][0];

        // Bin lag distance
        var lags = ((n * n - n) / 2) > 30 ? 30 : (n * n - n) / 2;
        var tolerance = variogram.range / lags;
        var lag = [0].rep(lags);
        var semi = [0].rep(lags);
        if (lags < 30) {
            for (l = 0; l < lags; l++) {
                lag[l] = distance[l][0];
                semi[l] = distance[l][1];
            }
        } else {
            for (i = 0, j = 0, k = 0, l = 0; i < lags && j < ((n * n - n) / 2); i++, k = 0) {
                while (distance[j][0] <= ((i + 1) * tolerance)) {
                    lag[l] += distance[j][0];
                    semi[l] += distance[j][1];
                    j++;
                    k++;
                    if (j >= ((n * n - n) / 2)) break;
                }
                if (k > 0) {
                    lag[l] /= k;
                    semi[l] /= k;
                    l++;
                }
            }
            if (l < 2) return variogram; // Error: Not enough points
        }

        // Feature transformation
        n = l;
        variogram.range = lag[n - 1] - lag[0];
        var X = [1].rep(2 * n);
        var Y = Array(n);
        var A = variogram.A;
        for (i = 0; i < n; i++) {
            switch (model) {
                case "gaussian":
                    X[i * 2 + 1] = 1.0 - Math.exp(-(1.0 / A) * Math.pow(lag[i] / variogram.range, 2));
                    break;
                case "exponential":
                    X[i * 2 + 1] = 1.0 - Math.exp(-(1.0 / A) * lag[i] / variogram.range);
                    break;
                case "spherical":
                    X[i * 2 + 1] = 1.5 * (lag[i] / variogram.range) -
                        0.5 * Math.pow(lag[i] / variogram.range, 3);
                    break;
            };
            Y[i] = semi[i];
        }

        // Least squares
        var Xt = kriging_matrix_transpose(X, n, 2);
        var Z = kriging_matrix_multiply(Xt, X, 2, n, 2);
        Z = kriging_matrix_add(Z, kriging_matrix_diag(1 / alpha, 2), 2, 2);
        var cloneZ = Z.slice(0);
        if (kriging_matrix_chol(Z, 2))
            kriging_matrix_chol2inv(Z, 2);
        else {
            kriging_matrix_solve(cloneZ, 2);
            Z = cloneZ;
        }
        var W = kriging_matrix_multiply(kriging_matrix_multiply(Z, Xt, 2, 2, n), Y, 2, n, 1);

        // Variogram parameters
        variogram.nugget = W[0];
        variogram.sill = W[1] * variogram.range + variogram.nugget;
        variogram.n = x.length;

        // Gram matrix with prior
        n = x.length;
        var K = Array(n * n);
        for (i = 0; i < n; i++) {
            for (j = 0; j < i; j++) {
                K[i * n + j] = variogram.model(Math.pow(Math.pow(x[i] - x[j], 2) +
                        Math.pow(y[i] - y[j], 2), 0.5),
                    variogram.nugget,
                    variogram.range,
                    variogram.sill,
                    variogram.A);
                K[j * n + i] = K[i * n + j];
            }
            K[i * n + i] = variogram.model(0, variogram.nugget,
                variogram.range,
                variogram.sill,
                variogram.A);
        }

        // Inverse penalized Gram matrix projected to target vector
        var C = kriging_matrix_add(K, kriging_matrix_diag(sigma2, n), n, n);
        var cloneC = C.slice(0);
        if (kriging_matrix_chol(C, n))
            kriging_matrix_chol2inv(C, n);
        else {
            kriging_matrix_solve(cloneC, n);
            C = cloneC;
        }

        // Copy unprojected inverted matrix as K
        var K = C.slice(0);
        var M = kriging_matrix_multiply(C, t, n, n, 1);
        variogram.K = K;
        variogram.M = M;

        return variogram;
    };

    // Model prediction
    kriging.predict = function(x, y, variogram) {
        var i, k = Array(variogram.n);
        for (i = 0; i < variogram.n; i++)
            k[i] = variogram.model(Math.pow(Math.pow(x - variogram.x[i], 2) +
                    Math.pow(y - variogram.y[i], 2), 0.5),
                variogram.nugget, variogram.range,
                variogram.sill, variogram.A);
        return kriging_matrix_multiply(k, variogram.M, 1, variogram.n, 1)[0];
    };
    kriging.variance = function(x, y, variogram) {
        var i, k = Array(variogram.n);
        for (i = 0; i < variogram.n; i++)
            k[i] = variogram.model(Math.pow(Math.pow(x - variogram.x[i], 2) +
                    Math.pow(y - variogram.y[i], 2), 0.5),
                variogram.nugget, variogram.range,
                variogram.sill, variogram.A);
        return variogram.model(0, variogram.nugget, variogram.range,
                variogram.sill, variogram.A) +
            kriging_matrix_multiply(kriging_matrix_multiply(k, variogram.K,
                    1, variogram.n, variogram.n),
                k, 1, variogram.n, 1)[0];
    };

    // Gridded matrices or contour paths
    kriging.grid = function(polygons, variogram, width) {
        var i, j, k, n = polygons.length;
        if (n == 0) return;

        // Boundaries of polygons space
        var xlim = [polygons[0][0][0], polygons[0][0][0]];
        var ylim = [polygons[0][0][1], polygons[0][0][1]];
        for (i = 0; i < n; i++) // Polygons
            for (j = 0; j < polygons[i].length; j++) { // Vertices
            if (polygons[i][j][0] < xlim[0])
                xlim[0] = polygons[i][j][0];
            if (polygons[i][j][0] > xlim[1])
                xlim[1] = polygons[i][j][0];
            if (polygons[i][j][1] < ylim[0])
                ylim[0] = polygons[i][j][1];
            if (polygons[i][j][1] > ylim[1])
                ylim[1] = polygons[i][j][1];
        }

        // Alloc for O(n^2) space
        var xtarget, ytarget;
        var a = Array(2),
            b = Array(2);
        var lxlim = Array(2); // Local dimensions
        var lylim = Array(2); // Local dimensions
        var x = Math.ceil((xlim[1] - xlim[0]) / width);
        var y = Math.ceil((ylim[1] - ylim[0]) / width);

        var A = Array(x + 1);
        for (i = 0; i <= x; i++) A[i] = Array(y + 1);
        for (i = 0; i < n; i++) {
            // Range for polygons[i]
            lxlim[0] = polygons[i][0][0];
            lxlim[1] = lxlim[0];
            lylim[0] = polygons[i][0][1];
            lylim[1] = lylim[0];
            for (j = 1; j < polygons[i].length; j++) { // Vertices
                if (polygons[i][j][0] < lxlim[0])
                    lxlim[0] = polygons[i][j][0];
                if (polygons[i][j][0] > lxlim[1])
                    lxlim[1] = polygons[i][j][0];
                if (polygons[i][j][1] < lylim[0])
                    lylim[0] = polygons[i][j][1];
                if (polygons[i][j][1] > lylim[1])
                    lylim[1] = polygons[i][j][1];
            }

            // Loop through polygon subspace
            a[0] = Math.floor(((lxlim[0] - ((lxlim[0] - xlim[0]) % width)) - xlim[0]) / width);
            a[1] = Math.ceil(((lxlim[1] - ((lxlim[1] - xlim[1]) % width)) - xlim[0]) / width);
            b[0] = Math.floor(((lylim[0] - ((lylim[0] - ylim[0]) % width)) - ylim[0]) / width);
            b[1] = Math.ceil(((lylim[1] - ((lylim[1] - ylim[1]) % width)) - ylim[0]) / width);
            for (j = a[0]; j <= a[1]; j++)
                for (k = b[0]; k <= b[1]; k++) {
                    xtarget = xlim[0] + j * width;
                    ytarget = ylim[0] + k * width;
                    if (polygons[i].pip(xtarget, ytarget))
                        A[j][k] = kriging.predict(xtarget,
                            ytarget,
                            variogram);
                }
        }
        A.xlim = xlim;
        A.ylim = ylim;
        A.zlim = [variogram.t.min(), variogram.t.max()];
        A.width = width;
        return A;
    };
    kriging.contour = function(value, polygons, variogram) {

    };

    // Plotting on the DOM
    kriging.plot = function(canvas, grid, xlim, ylim, colors) {
        // Clear screen
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Starting boundaries
        var range = [xlim[1] - xlim[0], ylim[1] - ylim[0], grid.zlim[1] - grid.zlim[0]];
        var i, j, x, y, z;
        var n = grid.length;
        var m = grid[0].length;
        var wx = Math.ceil(grid.width * canvas.width / (xlim[1] - xlim[0]));
        var wy = Math.ceil(grid.width * canvas.height / (ylim[1] - ylim[0]));
        for (i = 0; i < n; i++)
            for (j = 0; j < m; j++) {
                if (grid[i][j] == undefined) continue;
                x = canvas.width * (i * grid.width + grid.xlim[0] - xlim[0]) / range[0];
                y = canvas.height * (1 - (j * grid.width + grid.ylim[0] - ylim[0]) / range[1]);
                z = (grid[i][j] - grid.zlim[0]) / range[2];
                if (z < 0.0) z = 0.0;
                if (z > 1.0) z = 1.0;

                ctx.fillStyle = colors[Math.floor((colors.length - 1) * z)];
                ctx.fillRect(Math.round(x - wx / 2), Math.round(y - wy / 2), wx, wy);
            }

    };


    return kriging;
}();


    var map = L.map('kljmap', {
      center: [38.65953686, 120.8696333],
      zoom: 9
    });

    L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var positions = [];
    world[0].forEach(function(point) {
        positions.push([point[1], point[0]]);
    });
    var scope = L.polyline(positions, {
        color: 'red',
        opacity: 0.2,
        width: 10
    }).addTo(map);
    map.fitBounds(scope.getBounds());

            function loadkriging() {
            var canvas = document.getElementById("canvasMap");
            canvas.width = 1000;
            canvas.height = 1000;
            var n = points.length;
            var t = [];
            var x = [];
            var y = [];
            for (var i = 0; i < n; i++) {
                t.push(points[i].attributes.TN_);
                x.push(points[i].geometry.x);
                y.push(points[i].geometry.y);
                L.circle([y[i], x[i]], {
                    radius: 1
                }).addTo(map);
            }
            var variogram = kriging.train(t, x, y, "exponential", 0, 100);

            var width = 0.0005;
            var grid = kriging.grid(world, variogram, width);
            var colors = ["#006837", "#1a9850", "#66bd63", "#a6d96a", "#d9ef8b", "#ffffbf",
                "#fee08b", "#fdae61", "#f46d43", "#d73027", "#a50026"
            ];
            // var colors= ["#00A600", "#01A600", "#03A700", "#04A700", "#05A800", "#07A800", "#08A900", "#09A900", "#0BAA00", "#0CAA00", "#0DAB00", "#0FAB00", "#10AC00", "#12AC00", "#13AD00", "#14AD00", "#16AE00", "#17AE00", "#19AF00", "#1AAF00", "#1CB000", "#1DB000", "#1FB100", "#20B100", "#22B200", "#23B200", "#25B300", "#26B300", "#28B400", "#29B400", "#2BB500", "#2CB500", "#2EB600", "#2FB600", "#31B700", "#33B700", "#34B800", "#36B800", "#37B900", "#39B900", "#3BBA00", "#3CBA00", "#3EBB00", "#3FBB00", "#41BC00", "#43BC00", "#44BD00", "#46BD00", "#48BE00", "#49BE00", "#4BBF00", "#4DBF00", "#4FC000", "#50C000", "#52C100", "#54C100", "#55C200", "#57C200", "#59C300", "#5BC300", "#5DC400", "#5EC400", "#60C500", "#62C500", "#64C600", "#66C600", "#67C700", "#69C700", "#6BC800", "#6DC800", "#6FC900", "#71C900", "#72CA00", "#74CA00", "#76CB00", "#78CB00", "#7ACC00", "#7CCC00", "#7ECD00", "#80CD00", "#82CE00", "#84CE00", "#86CF00", "#88CF00", "#8AD000", "#8BD000", "#8DD100", "#8FD100", "#91D200", "#93D200", "#95D300", "#97D300", "#9AD400", "#9CD400", "#9ED500", "#A0D500", "#A2D600", "#A4D600", "#A6D700", "#A8D700", "#AAD800", "#ACD800", "#AED900", "#B0D900", "#B2DA00", "#B5DA00", "#B7DB00", "#B9DB00", "#BBDC00", "#BDDC00", "#BFDD00", "#C2DD00", "#C4DE00", "#C6DE00", "#C8DF00", "#CADF00", "#CDE000", "#CFE000", "#D1E100", "#D3E100", "#D6E200", "#D8E200", "#DAE300", "#DCE300", "#DFE400", "#E1E400", "#E3E500", "#E6E600", "#E6E402", "#E6E204", "#E6E105", "#E6DF07", "#E6DD09", "#E6DC0B", "#E6DA0D", "#E6D90E", "#E6D710", "#E6D612", "#E7D414", "#E7D316", "#E7D217", "#E7D019", "#E7CF1B", "#E7CE1D", "#E7CD1F", "#E7CB21", "#E7CA22", "#E7C924", "#E8C826", "#E8C728", "#E8C62A", "#E8C52B", "#E8C42D", "#E8C32F", "#E8C231", "#E8C133", "#E8C035", "#E8BF36", "#E9BE38", "#E9BD3A", "#E9BC3C", "#E9BB3E", "#E9BB40", "#E9BA42", "#E9B943", "#E9B945", "#E9B847", "#E9B749", "#EAB74B", "#EAB64D", "#EAB64F", "#EAB550", "#EAB552", "#EAB454", "#EAB456", "#EAB358", "#EAB35A", "#EAB35C", "#EBB25D", "#EBB25F", "#EBB261", "#EBB263", "#EBB165", "#EBB167", "#EBB169", "#EBB16B", "#EBB16C", "#EBB16E", "#ECB170", "#ECB172", "#ECB174", "#ECB176", "#ECB178", "#ECB17A", "#ECB17C", "#ECB17E", "#ECB27F", "#ECB281", "#EDB283", "#EDB285", "#EDB387", "#EDB389", "#EDB38B", "#EDB48D", "#EDB48F", "#EDB591", "#EDB593", "#EDB694", "#EEB696", "#EEB798", "#EEB89A", "#EEB89C", "#EEB99E", "#EEBAA0", "#EEBAA2", "#EEBBA4", "#EEBCA6", "#EEBDA8", "#EFBEAA", "#EFBEAC", "#EFBFAD", "#EFC0AF", "#EFC1B1", "#EFC2B3", "#EFC3B5", "#EFC4B7", "#EFC5B9", "#EFC7BB", "#F0C8BD", "#F0C9BF", "#F0CAC1", "#F0CBC3", "#F0CDC5", "#F0CEC7", "#F0CFC9", "#F0D1CB", "#F0D2CD", "#F0D3CF", "#F1D5D1", "#F1D6D3", "#F1D8D5", "#F1D9D7", "#F1DBD8", "#F1DDDA", "#F1DEDC", "#F1E0DE", "#F1E2E0", "#F1E3E2", "#F2E5E4", "#F2E7E6", "#F2E9E8", "#F2EBEA", "#F2ECEC", "#F2EEEE", "#F2F0F0", "#F2F2F2"];



            kriging.plot(canvas, grid, [121.75573509037618, 122.01776807642929], [39.18501934760944, 39.39127165938733], colors);
        }

        function returnImgae() {
            var mycanvas = document.getElementById("canvasMap");
            return mycanvas.toDataURL("image/png");
        }

        loadkriging();

        var imageBounds = [
            [39.18501934760944, 121.75573509037618],
            [39.39127165938733, 122.01776807642929]
        ];
        var marker = L.marker([39.18501934760944, 121.75573509037618])
            .addTo(map);
        var marker1 = L.marker([39.39127165938733, 122.01776807642929])
            .addTo(map);


        L.imageOverlay(returnImgae(), imageBounds, {
            opacity: 0.8
        }).addTo(map);
 
        var mypop = L.popup();
        map.on('click', function(e) {
            var content = '';
            content += e.latlng.toString();
            mypop.setLatLng(e.latlng)
                .setContent(content)
                .openOn(map);
        });

  }
};
</script>


<style>
.main {
  background-color: #ffffff;
  padding: 10px;
}
#kljmap {
  height: calc(100vh - 80px);
  margin: 0px;
  padding: 0px;
}
</style>