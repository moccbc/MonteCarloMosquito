#include <iostream>
#include <iomanip>
#include <cmath>
#include <random>
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
    cin >> n;
    for (int i = 0; i < n; i++) {
        // Mosquito starting point
        double mx = 0.0, my = 0.0;
        bool found = false;
        for (int j = 0; j < 10; j++) {
            // Get the random direction that the mosquito will fly
            double angle = unif(re);

            // Found the human
            if (sqr(mx-hx) + sqr(my-hy) <= sqr(50.0)) {
                kill++;
                found = true;
                break;
            }

            // Calculate next coordinates that the mosquito will fly to
            mx = 250.0 * cos(angle * M_PI / 180.0) + mx;
            my = 250.0 * sin(angle * M_PI / 180.0) + my;
        }
        if (!found && (sqr(mx) + sqr(my) > sqr(1000.0)))
            die++;
    }

    cout << "Total Runs: " << n << endl;
    cout << "Probability of kill: " << fixed << setprecision(5)
         << kill/double(n) << endl;
    cout << "Probability of death outside 1km: " << fixed << setprecision(5)
         << die/double(n) << endl;
}
