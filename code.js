module.exports = {
    
        
        answers:[  `
         #include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>
using namespace std;

int simpleArraySum(vector<int> ar) {
    int sum = 0;
    for(int i = 0; i < ar.size(); i++){
        sum += ar[i];
    }
    return sum;
}

int main() {
    int n;
    vector<int> ans;
    int sum;
    cin >> n;
    for(int i = 0; i < n; i++) {
        int element;
        cin >> element;
        ans.push_back(element);
    }
    sum = simpleArraySum(ans);
    cout << sum;
    return 0;
}

                `]
    }

