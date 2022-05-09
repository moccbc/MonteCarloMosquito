#include <iostream>
#include <iomanip>
#include <cmath>
#include <random>
#include <vector>
#include <string>
using namespace std;

double sqr(double x) {
    return x*x;
}

int main() {
    // Generator that will generate random direction
    // Referenced en.cppreference.com/w/cpp/numeric/random
    random_device rd;
    default_random_engine re(rd());
    uniform_real_distribution<double> unif(0, 360);

    double hx = 0.0, hy = 250.0;

    int kill = 0, die = 0;
    int n = 10000;
    vector<int> killByDay(101, 0);
    for (int i = 0; i < n; i++) {
        // Mosquito starting point
        double mx = 0.0, my = 0.0;
        bool found = false;

        for (int j = 1; j <= 100; j++) {
            // Get the random direction that the mosquito will fly in
            double angle = unif(re);

            // Found the human
            if (sqr(mx-hx) + sqr(my-hy) <= sqr(50.0)) {
                killByDay[j]++;
                found = true;
                break;
            }

            // Calculate the next coordinates that the mosquito will fly to
            mx = 250.0 * cos(angle * M_PI / 180.0) + mx;
            my = 250.0 * sin(angle * M_PI / 180.0) + my;
        }
    }

    for (int i = 2; i <= 100; i++) {
        killByDay[i] += killByDay[i-1];
    }

    for (int i = 1; i <= 100; i++) {
        cout << setw(3) << i << ": "
             << fixed << setprecision(4)
             << string(floor(double(killByDay[i])/double(n) * 100), '*') << endl;
    }
}
